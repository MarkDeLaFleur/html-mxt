<script Lang ts>
	// @ts-nocheck
	//  scalar,getbuildinfo,mat
	import cv from '@markdelafleur/opencv'
	import { videoSettings } from '../myFunctions/VideoStore';
	import { playerScore } from '$lib/myFunctions/TableStore';
	export let canvasId="showVid1";
	export let canvasIdW="showTest";
	export let roundSelected=0;
	let clr = {};
	export let selected=0;
	let totalofAllDominos = 0;
	let dispWidth;
	$:{
		dispWidth = dispWidth;
	}
	let countState = "COUNT DOMINOS";
	let buildInfo = '';
	let videoInfo = '';
	/**
	 * @type {HTMLVideoElement}
	 */	
	 let ctx;
	 let ctxT;
	let videO;
	let	canvas;
	let canvasT;
	let matTest;
	let aspectR;
	let constraintFromVideoSettings = {video: {deviceId: "" ,
			 width: window.screen.availWidth, 
			 height: window.screen.availHeight,	frameRate: 30}};
	if (window.screen.availHeight > window.screen.availWidth){
		// probable  mobile device
		aspectR = 0.75
	}
	else  {
		 aspectR = window.screen.availHeight / window.screen.availWidth
	
	}
	console.log('device screen size ' + window.screen.availWidth + ' / ' + window.screen.availWidth * aspectR +
	            'aspect ratio ' + aspectR) ;
	
	
	initVideo();
	setTimeout(loadOpencv,0);
	/**
	 * F U N C T I O N S 
	 */
	async function initVideo() {
		console.log("init Video");
		// initialize the Video Settings from the video Store
		constraintFromVideoSettings.video.deviceId =  $videoSettings.deviceId;
	
		constraintFromVideoSettings.video.width = 	$videoSettings.canvasWidth > window.screen.availWidth 
			?	window.screen.availWidth * .90
			: 	$videoSettings.canvasWidth ;
		constraintFromVideoSettings.video.height = constraintFromVideoSettings.video.width * aspectR;
		constraintFromVideoSettings.video.frameRate = $videoSettings.FPS;
		videoInfo = ' video width ' + '(' + constraintFromVideoSettings.video.width   +')'  +
	  				' height (' + constraintFromVideoSettings.video.height + ')';
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
       		 navigator.mediaDevices.getUserMedia(constraintFromVideoSettings)
			 .then(function(stream) {
				videO = document.getElementById('videO');// setting this outside of the callback - bad news.
	 	       	videO.srcObject = stream;
	        	videO.play();
 	   		})
			.catch((err) => {
			console.log('Video streaming error -- something went wrong ' + err + videO.paused);
			});

		}  
	}

	async function loadOpencv() {

		try {
			//window.cv = cv;
			buildInfo = cv.getBuildInformation();
			if (buildInfo.length > 0) {
				clr = {
					Red: new cv.Scalar(255.0, 0.0, 0.0, 255.0),
					Blue: new cv.Scalar(0.0, 0.0, 255.0, 255.0),
					Blue2: new cv.Scalar(155.0, 0.0, 0.0, 255.0),
					Green: new cv.Scalar(0.0, 255.0, 0.0, 255.0),
					Black: new cv.Scalar(50.0, 50.0, 0.0, 255.0),
					Yellow: new cv.Scalar(255.0, 160.0, 0.0, 255.0),
					White: new cv.Scalar(0.0, 0.0, 0.0, 255.0)
				};
				canvas = document.getElementById(canvasId);
				console.log(`ctx initialize canvas w/h = ${canvas.width} / ${canvas.height}`)
				ctx    = canvas.getContext('2d', { alpha: true , 
								desynchronized: false ,
								colorSpace: 'srgb' ,
								willReadFrequently: true
								}
						 );
			    canvasT = document.getElementById(canvasIdW);
				ctxT    = canvasT.getContext('2d', { alpha: true , 
								desynchronized: false ,
								colorSpace: 'srgb' ,
								willReadFrequently: true
								}
						 );

				matTest = {tmpMat: new cv.Mat(), rectArray: [new cv.Rect()]};            
				buildInfo = videoInfo + 'Ready to Count!' ;

				setTimeout(processVideo,1000);

			}   //build info length
		} catch (err) {
			buildInfo = 'setting up opencv ... ' + err;
			setTimeout(loadOpencv, 1000); // try opencv again.
		}
	}

	function processVideo() {
		let begin = Date.now();
		let delay = 1000 / constraintFromVideoSettings.video.frameRate - (Date.now() - begin);
		if (videO.srcObject.active) {
			try {
		
				if (countState == "COUNT DOMINOS"){
					let dominoWidth = Math.round(canvas.width / 4)-10;
					buildInfo = `domino Width ${dominoWidth}`
					ctx.clearRect(0,0, canvas.width,canvas.height);
						
					//ctx.drawImage(videO,20,20,canvas.width,120,20,20,canvas.width,120);
					ctx.drawImage(videO,20,20,canvas.width/1.8,canvas.height/1.8,5,20,
					canvas.width,canvas.height)
      				ctx.font = "bold 18px Arial";
					ctx.fillStyle="Green";
      				ctx.fillText("Click to Count Pips",10,18,200);
				}
			} catch (err) {
				let errStr = err + " ";
				console.log("ok process video is having an issue " + errStr);
				if (	errStr.indexOf('valid canvas element') > 0  ||
			    		errStr.indexOf( 'innerText') > 0  ||
						errStr.indexOf( "Failed to execute 'drawImage' on") > 0 ) {  
					console.log("checking videO src object" + videO.srcObject());
					setTimeout(processVideo,delay);
					return;	// you most likely selected another link.
					}
				else{
				console.log(err + ' in process video callback "ShowVid1" ' );
				}
			}
		setTimeout(processVideo, delay);
		
		}
	}
	
	function tryCountingDots() {
	
		if (countState == "TRY AGAIN"){
			countState = "COUNT DOMINOS";
			buildInfo = "Ready to Count!";
			setTimeout(processVideo,1000);
		}
		else {
		
			let rectArray = getRects(cv.matFromImageData(ctx.getImageData(0,0,canvas.width,canvas.height)));
			processMinEncCirc(rectArray);
			countState = "TRY AGAIN";
			ctx.fillStyle = "red";
      		ctx.font = "bold 18px Arial";
      		ctx.fillText("######################   Click Again to Retry...",10,18,300);
			canvas.delete;
			rectArray.delete;	
			setTimeout(processVideo,0);
		}
	  
	}
	
	function getRects(matIn) { 
		let contours = new cv.MatVector();
		let heirs    = new cv.Mat()
		let wrkGray = new cv.Mat(matIn.size().height, matIn.size().width, cv.CV_8UC4);
		cv.cvtColor(matIn, wrkGray, cv.COLOR_RGBA2GRAY,0);
		let startThresh = 160;
		cv.threshold(wrkGray, wrkGray, startThresh, 255,cv.THRESH_BINARY);
		cv.findContours(wrkGray, contours, heirs, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);
		let rectRoi = [];
		for (let j = 0; j < contours.size(); j++) {
		  	const rect = cv.boundingRect(contours.get(j));
			/*console.log(`rect width and height ${rect.width} / ${rect.height} \n
			*  rect x-y coordinates ${rect.x} / ${rect.y} \n
			  height * 2 - width is ${rect.height*2-rect.width}`);
			*/
			if( rect.width > rect.height && 
				(rect.height * 2 - rect.width) < 10 ) rectRoi.push(matIn.roi(rect));
		
			if (rect.width < rect.height && rect.width * 2 - rect.height < 10){
				let wMat = matIn.clone();
				wMat  = matIn.roi(rect);
				cv.rotate(wMat,wMat,cv.ROTATE_90_CLOCKWISE);
				rectRoi.push(wMat)
				console.log (`rotated rectangle ${wMat.size().width} by ${wMat.size().height}`);
				wMat.delete;
			} 
		}	

		/*console.log('returning ' + rectRoi.length + ' Dominos'); */
		return rectRoi.sort((a,b) => a.cols > b.cols);
	}
	
	// calculates number of pips on each domino and returns an array of the pips and their radia
	function processMinEncCirc(matDomArray){ 
		let domArray = [];
		console.log('array of dominos = ' + matDomArray.length)
		matDomArray.forEach((matDom) =>{	
			let wrkDom = matDom.clone();
			cv.cvtColor(wrkDom, wrkDom, cv.COLOR_RGBA2GRAY, 0);
			cv.threshold(wrkDom,wrkDom, 155, 255,cv.THRESH_BINARY);
			let cons = new cv.MatVector();
			let hier = new cv.Mat();
			cv.findContours(wrkDom, cons, hier, cv.RETR_CCOMP,  cv.CHAIN_APPROX_SIMPLE);
			let areaArray = [];
			let pipTotal = 0;
		
			for (let i = 1; i < cons.size(); i++) {
    			let cnt = cons.get(i);
				let minCirc = cv.minEnclosingCircle(cnt);
				areaArray.push({pt: new cv.Point(Math.round(minCirc.center.x),
					Math.round(minCirc.center.y)),
					radius: Math.round(minCirc.radius)});
					/*console.log(`center ${Math.round(minCirc.center.x)}/
					${Math.round(minCirc.center.y)} radius ${Math.round(minCirc.radius)}`);*/
				pipTotal+=1;
				cnt.delete;
			}
			if (areaArray.length > 0){
				areaArray.sort((a,b) =>  a.pt > b.pt && a.radius > b.radius );
				/*console.log(`'before radius adjustments pip total - ${areaArray.length}`) */
				let maxSize = Math.round(Math.max.apply(Math,areaArray.map((size) => size.radius )));
				let minSize = Math.round(Math.min.apply(Math,areaArray.map((size) => size.radius )));
				areaArray.forEach( (val,num) => {
					if(val.radius >= maxSize) {
						/* console.log(`pip # ${num+1} radius ${val.radius} removed`); */
						pipTotal-=1;
						areaArray.splice(num,1);
					}
				});
				const sum = Math.round(areaArray.reduce((acc,curr) => acc + curr.radius,0 ));
				const avg = Math.round(sum/areaArray.length);		
				/*console.log(`after pip radius adjustments pip total ${areaArray.length}`); */
				domArray.push({matDom: matDom,pipTotal: pipTotal,
					maxSize: maxSize, minSize: minSize, avgSize: avg, ptArray: areaArray});		
			}
			wrkDom.delete; hier.delete; cons.delete; 
		});
		console.log('domArray has ' + domArray.length + ' members'	)
		showCanvasT(domArray);
		domArray.delete;
	
	}
	
	function showCanvasT(imageDataArr){
			
		const htmlDispDiv = '<div class="flex flex-row ">';
		const htmlDispVar =  '<div class="basis-1/4 text-end">';
		const htmlDispFix =  '</div>';
		let dominoStr = '';
		/*test purposes uncomment
        dominoStr += htmlDispDiv + htmlDispVar 'Number' + htmlDispFix;
		dominoStr += htmlDispVar + 'Count' + htmlDispFix;
		dominoStr += htmlDispVar + 'Size' + htmlDispFix;
		dominoStr += htmlDispVar + 'Max Radius' + htmlDispFix;
		dominoStr += htmlDispVar + 'Min Radius' + htmlDispFix; 
		dominoStr += htmlDispVar + 'Avg Radius' + htmlDispFix; 
		dominoStr  += htmlDispFix;
		*/

		ctxT.clearRect(0, 0,canvasT.width,canvasT.height);
		let stX = 5;
		let stY = 20;
		let combineImg = [];
		totalofAllDominos = imageDataArr.reduce((partialsum,a) => partialsum+a.pipTotal,0)
		imageDataArr.forEach((domMat,num) =>{
			let tmpMat = domMat.matDom.clone();
			/* test purposes only uncomment
			dominoStr +=  htmlDispDiv +   htmlDispVar + (num + 1) +  htmlDispFix;
			dominoStr +=  htmlDispVar + domMat.pipTotal +  htmlDispFix;
			dominoStr +=  htmlDispVar + (domMat.matDom.size().width*domMat.matDom.size().height) + htmlDispFix;
			dominoStr +=  htmlDispVar +  domMat.maxSize +  htmlDispFix;
			dominoStr +=  htmlDispVar +  domMat.minSize + htmlDispFix ;
			dominoStr +=  htmlDispVar +  domMat.avgSize + htmlDispFix ;
			dominoStr += htmlDispFix;
			*/
		
			domMat.ptArray.forEach(pipArray => {
				/*console.log(`drawing pip marker for ${pipArray.pt.x}/${pipArray.pt.y} size ${pipArray.radius}
			         max size ${domMat.maxSize}		`);*/
				cv.drawMarker(tmpMat,pipArray.pt,clr.Green,cv.MARKER_DIAMOND,2,1,cv.LINE_8);
				/*cv.circle(tmpMat,pipArray.pt,pipArray.radius,clr.Blue2,1,cv.LINE_AA); */
			});
			let wrkMat = new cv.Mat();
			cv.copyMakeBorder(tmpMat,wrkMat, 2, 2, 2, 2, cv.BORDER_CONSTANT, clr.Blue);
			/* **
			* @type {Uint8ClampedArray}
			*/
			let clampedArr = new Uint8ClampedArray(wrkMat.data);
			/* ** 
			* @type {ImageData}
			*/
			let imgData = new ImageData(clampedArr,wrkMat.size().width,
					wrkMat.size().height);

			combineImg.push({img: imgData,pips: domMat.ptArray.length});
			wrkMat.delete;tmpMat.delete;
		
		});
		buildInfo = 'Total of All Dominos ==> ' + totalofAllDominos + '\n' + dominoStr;
		dispWidth = combineImg.reduce((preVal,a) => preVal + a.img.width,0)
		combineImg.forEach((item,x) =>{
			ctxT.font = "bold 12px Arial";
			ctxT.fillStyle="Blue";
      		ctxT.fillText("#_"+(x+1)+" == "+item.pips+"  " ,stX,stY-5);
			ctxT.putImageData(item.img,stX,stY);
			stX = stX+item.img.width;
		});
	

	}
	function updatePlayerTable(){
        // update and get out
		//using roundSelected, selected (index) and adding total of all dominos to table.
		//show it first:
		$playerScore[selected].pScore[roundSelected]  =   totalofAllDominos ;
		buildInfo = $playerScore[selected].playerName + " score has been updated to " + totalofAllDominos;
    }

</script>
<div>
	<video width={constraintFromVideoSettings.video.width} title='Hidden Video' hidden
	autoplay=true
	height={constraintFromVideoSettings.video.height} id="videO"> Nothing to See Here 
	<track kind="captions" /> 
	</video>

</div>

<!-- svelte-ignore a11y-missing-content -->
<div>
	<br>
	
	<button
		type="button" id="UpdatePlayerScore" on:click={() => updatePlayerTable()}
		class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
    			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
   			 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
   			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		Adcept Pip Count
		</button>

		
</div>
<div >

	<div >
		<canvas  id={canvasId}   width={constraintFromVideoSettings.video.width} 
			    height={constraintFromVideoSettings.video.height}
				title="Video Canvas {constraintFromVideoSettings.video.width} by {constraintFromVideoSettings.video.height} FPS {$videoSettings.FPS}
				 Using {$videoSettings.label}" 
				 on:click={() => tryCountingDots()}
				 class="ml-3 border-solid border-orange-400 border-4 w-{constraintFromVideoSettings.video.width}
					h-{constraintFromVideoSettings.video.height}">
  		</canvas>

	</div>
</div>	
		
		<p class="ml-3 border-solid border-blue-400 border-2 m:w-1/5 
			w-{constraintFromVideoSettings.video.width}
			h-{constraintFromVideoSettings.video.height} scroll-m-20">
				Information Section <br>
		
			{@html buildInfo.replace(/\n/g, '<br/>')}  	
		
		</p>	
	
	<div class="overflow-visible">
		<canvas  id={canvasIdW}   width=1500
			    height=100
				title="Show Dominos Canvas Using {$videoSettings.label}" class="ml-3  
				  scroll-mr-0 "

				 >
  		</canvas>
	</div>	