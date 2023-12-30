<script Lang ts>
	// @ts-nocheck
	//  scalar,getbuildinfo,mat
	import cv, { drawMarker, dumpInputOutputArrayOfArrays } from '@markdelafleur/opencv'
	import { videoSettings } from '../myFunctions/VideoStore';
	import {goto} from '$app/navigation'
	import { playerScore } from '$lib/myFunctions/TableStore';
	import { navigating } from '$app/stores';
	export let canvasId="showVid1";
	export let canvasIdW="showTest";
	export let roundSelected=0;
	let clr = {};
	export let selected=0;
	let totalofAllDominos = 0;
	let countState = "COUNT DOMINOS";
	let cl = 0;
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
					ctx.clearRect(0,0, canvas.width,canvas.height);
						
					ctx.drawImage(videO,20,20,canvas.width,120,20,20,canvas.width,120);
					ctx.strokeStyle = "white"
					ctx.linewidth ="10"
    				ctx.strokeRect(25,25,50,25);
	/*				ctx.beginPath();
					ctx.moveTo(25,53);
					ctx.lineTo(240,53);
					ctx.moveTo(25,78);
					ctx.lineTo(240,78);
					ctx.moveTo(25,105);
					ctx.lineTo(240,105);					
					ctx.closePath();
					ctx.stroke();
 */
      				ctx.font = "bold 18px Arial";
      				ctx.fillText("Click to Count Pips",10,18);
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
			//getRects(cv.matFromImageData(ctx.getImageData(10,18,
			//(constraintFromVideoSettings.video.width ),
			//		     ( constraintFromVideoSettings.video.height))));(10,10,350,150)
			let rectArray =    getRects(cv.matFromImageData(ctx.getImageData(10,25,240,25)));
			let rectArray1 =   getRects(cv.matFromImageData(ctx.getImageData(25,53,240,25)));
			let rectArray2 =   getRects(cv.matFromImageData(ctx.getImageData(53,78, 240,25)));
			let rectArray3 =   getRects(cv.matFromImageData(ctx.getImageData(78,103, 240,25)));

			let combArray = [...rectArray,...rectArray1,...rectArray2,...rectArray3];
			countDominoPips(combArray);

		
			
			countState = "TRY AGAIN";
		/*
			ctx.clearRect(0, 0, constraintFromVideoSettings.video.width, 
						    constraintFromVideoSettings.video.height);	
		*/
							/* ** 
			* @type {ImageData}
			*/
			/*
			const imageData = new ImageData(new Uint8ClampedArray(matIn.data),
				matIn.cols,matIn.rows);
			ctx.putImageData(imageData,20,20);
			*/
			ctx.fillStyle = "red";
      		ctx.font = "bold 18px Arial";
      		ctx.fillText("Click Again to Count Pips",10,18);
			canvas.delete;
			//contours.delete;
			//wrkGray.delete;
			//heirs.delete;	
			
			//matIn.delete;
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
		let rectArray = [];
		for (let j = 0; j < contours.size(); j++) {
		  	const rect = cv.boundingRect(contours.get(j));
			console.log(`rect width and height ${rect.width} / ${rect.height}`)
			console.log(`rect points ${rect.x} / ${rect.y}`)
			if(rect.width > 20 ) rectArray.push(rect) ;
		}	
	/* **	if (rectArray.length < 1){
				buildInfo = 'There were no Dominos that meet the width and height requirement detected';
				countState = "COUNT DOMINOS";
				return;
		}
		*/
			rectArray.sort( (a,b) => {
				a.x < b.x ? 1 : 0;
				a.y > b.y ? 1 : 0;

			});
			let rectRoi  = [];
			rectArray.forEach(x => {
				rectRoi.push(matIn.roi(x));
			})


		console.log('returning ' + rectRoi.length + ' Dominos');
		return rectRoi;
	}
	
	function countDominoPips (dominosIn) {
		let domArray = processMinEncCirc(dominosIn);
		
		if (domArray.length == 0) {
			domArray.delete;
		
			return;
		}
		
		// put the markers on the dominos
		showCanvasT(domArray); 
		const htmlDispDiv = '<div class="flex flex-row ">';
		const htmlDispVar =  '<div class="basis-1/4 text-end">';
		const htmlDispFix =  '</div>';
		let dominoStr = htmlDispDiv + htmlDispVar + 'Number' + htmlDispFix;
		dominoStr += htmlDispVar + 'Count' + htmlDispFix;
		dominoStr += htmlDispVar + 'Size' + htmlDispFix;
		dominoStr += htmlDispVar + 'Max Radius' + htmlDispFix;
		dominoStr += htmlDispVar + 'Min Radius' + htmlDispFix; 
		dominoStr += htmlDispVar + 'Avg Radius' + htmlDispFix; 

		dominoStr  += htmlDispFix;
		let totalofAllDominos = 0;
		domArray.forEach((domino,num) =>{
			dominoStr +=  htmlDispDiv +   htmlDispVar + (num + 1) +  htmlDispFix;

			dominoStr +=  htmlDispVar + domino.pipTotal +  htmlDispFix;
			dominoStr +=  htmlDispVar + (domino.matDom.size().width*domino.matDom.size().height) + htmlDispFix;
			dominoStr +=  htmlDispVar +  domino.maxSize +  htmlDispFix;
			dominoStr +=  htmlDispVar +  domino.minSize + htmlDispFix ;
			dominoStr +=  htmlDispVar +  domino.avgSize + htmlDispFix ;
			dominoStr += htmlDispFix;
			totalofAllDominos += domino.pipTotal;
		});

		domArray.delete;
		buildInfo = 'Total of All Dominos ==> ' + totalofAllDominos + '\n' + dominoStr;
		return;
	}
	// calculates number of pips on each domino and returns an array of the pips and their radia
	function processMinEncCirc(matDomArray){ 
		let domArray = [];
		console.log('array of dominos = ' + matDomArray.length)
		matDomArray.forEach((matDom) =>{	
			let resizeDomino = new cv.Mat();
			cv.resize(matDom,resizeDomino,new cv.Size(0,0),1.5,1.5,cv.INTER_LINEAR);
			console.log(`resize domino width height is ${resizeDomino.size().width} / ${resizeDomino.size().height}`);
			let wrkDom = resizeDomino.clone();
			cv.cvtColor(wrkDom, wrkDom, cv.COLOR_RGBA2GRAY, 0);
			cv.threshold(wrkDom,wrkDom, 160, 255,cv.THRESH_BINARY);
			let cons = new cv.MatVector();
			let hier = new cv.Mat();
			cv.findContours(wrkDom, cons, hier, cv.RETR_LIST,  cv.CHAIN_APPROX_NONE);
			let areaArray = [];
			let pipTotal = 0;
		
			for (let i = 1; i < cons.size(); i++) {
    			let cnt = cons.get(i);
				let minCirc = cv.minEnclosingCircle(cnt);
				areaArray.push({pt: new cv.Point(minCirc.center.x, minCirc.center.y),
					radius: Math.round(minCirc.radius)});
				pipTotal+=1;		
				cnt.delete;
			}
			if (areaArray.length > 0){
				let maxSize = Math.round(Math.max.apply(Math,areaArray.map((size) => size.radius )));
				let minSize = Math.round(Math.min.apply(Math,areaArray.map((size) => size.radius )));
				areaArray.forEach( (val,num) => {
						if(val.radius >= maxSize) {
							pipTotal-=1;
							 areaArray.splice(num,1);
							 maxSize = Math.round(Math.max.apply(Math,areaArray.map((size) => size.radius )));

						}
						if(val.radius == minSize && minSize <= 1){
							pipTotal-=1;
							areaArray.splice(num,1);
							minSize = Math.round(Math.min.apply(Math,areaArray.map((size) => size.radius )));
						} 				

						
				});
				const sum = Math.round(areaArray.reduce((acc,curr) => acc + curr.radius,0 ));
				const avg = Math.round(sum/areaArray.length);
				domArray.push({matDom: resizeDomino,pipTotal: pipTotal,
					maxSize: maxSize, minSize: minSize, avgSize: avg, ptArray: areaArray});		
			}
//			else{
//				domArray.push({matDom: resizeDomino, pipTotal: 0,
//					maxSize: 0, minSize: 0, avgSize: 0, ptArray: {pt:{x: 0,y: 0},size: 0}});
//			}
	
			wrkDom.delete; hier.delete; cons.delete; resizeDomino.delete;
		});
		console.log('domArray has ' + domArray.length + ' members'	)
		return domArray;
	}
	
	function showCanvasT(imageDataArr){

		ctxT.clearRect(0, 0,canvasT.width,canvasT.height);
		let stX = 5;
		let stY = 20;
		let newRow = 1;
		let tmpMat;
		imageDataArr.forEach((domMat,number) =>{
				tmpMat = domMat.matDom.clone();
				domMat.ptArray.forEach(pipArray => {
					cv.drawMarker(tmpMat,pipArray.pt,clr.Green,cv.MARKER_DIAMOND,2,1,cv.LINE_AA);
				});
				let wrkMat = new cv.Mat();
				cv.copyMakeBorder(tmpMat,wrkMat, 2, 2, 2, 2, cv.BORDER_CONSTANT, clr.Black);
					//ctxT.fillStyle = "red";
    				//ctxT.font = "bold 8px Arial";
					//const desc = "Test Contours " + img.rows + " / " + img.cols
    				//ctxT.fillText(desc ,stX-4,stY-19);
				if (stX+wrkMat.size().width > canvasT.width){
					stX = 5;
					stY = 29+wrkMat.size().height+5;

				}
				ctxT.putImageData(new ImageData(new Uint8ClampedArray(wrkMat.data),wrkMat.size().width,
				wrkMat.size().height),stX,stY);
				stX+=wrkMat.size().width+6;
			
				wrkMat.delete;
			
		});
		tmpMat.delete;

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
	<!-- commenting out because I moved the on: click to the canvas element
	<button
		type="button" id="countButton" on:click={() => tryCountingDots()}
		class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
       			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
			  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
   			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		{countState}
	</button>
	-->
	<button
		type="button" id="UpdatePlayerScore" on:click={() => updatePlayerTable()}
		class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
    			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
   			 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
   			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		Update Player's Score
		</button>

		
</div>
<div class="w-full ml-5 lg:ml-2 grid grid-cols-1  md:grid-cols-2 gap-4
			border-2 border-amber-300 content-normal md:w-3/4">

	<div >
		<canvas  id={canvasId}   width={constraintFromVideoSettings.video.width} 
			    height={constraintFromVideoSettings.video.height}
				title="Video Canvas {constraintFromVideoSettings.video.width} by {constraintFromVideoSettings.video.height} FPS {$videoSettings.FPS}
				 Using {$videoSettings.label}" 
				 on:click={() => tryCountingDots()}>
  		</canvas>

	</div>

	
	<div class="build-info  border rounded-md bg-gray-200 ">	
		<p >	Information Section <br></p>
		<div >
			{@html buildInfo.replace(/\n/g, '<br/>')}  	
	
		</div>

	</div>
	<div >
		<canvas  id={canvasIdW}   width={constraintFromVideoSettings.video.width} 
			    height={constraintFromVideoSettings.video.height}
				title="Test Canvas {constraintFromVideoSettings.video.width} by {constraintFromVideoSettings.video.height} FPS {$videoSettings.FPS}
				 Using {$videoSettings.label}" 
				 >
  		</canvas>

	</div>


</div>