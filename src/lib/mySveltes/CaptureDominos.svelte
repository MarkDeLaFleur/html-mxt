<script Lang ts>
	// @ts-nocheck
	//  scalar,getbuildinfo,mat
	import cv from '@techstark/opencv-js';
	import { videoSettings } from '../myFunctions/VideoStore';
	import {goto} from '$app/navigation'
	import { playerScore } from '$lib/myFunctions/TableStore';
	export let canvasId="showVid1";
	export let roundSelected=0;
	let clr = {};
	export let selected=0;
	let totalofAllDominos = 0;
	let countState = "COUNT DOMINOS";
	let cl = 0;
	let buildInfo = 'loading...';
	// start at  x,y to x+ height y+ width ie (10,10) (10+64,10+128)
	/**
	 * @type {HTMLVideoElement}
	 */
	let videO;
	let cap;
	let	canvas;
	let ctx;
	
	//let imageCapture;
	let matTest; 
	let constraintFromVideoSettings = {video: {deviceId: "" , width: 640, height: 480,	frameRate: 15}};
	let src;
	initVideo();
	setTimeout(loadOpencv,0);
	async function initVideo() {

		constraintFromVideoSettings.video.deviceId =  $videoSettings.deviceId;
		constraintFromVideoSettings.video.width = $videoSettings.canvasWidth;
		constraintFromVideoSettings.video.frameRate = $videoSettings.FPS;
		constraintFromVideoSettings.video.height = Math.round($videoSettings.canvasWidth*3/4);
		buildInfo = ('video setting device Id / Label ' + constraintFromVideoSettings.video.deviceId + '/' +
	 				$videoSettings.label + ' and width ' + '(' + constraintFromVideoSettings.video.width   +')'  +
	  				' and height ' + constraintFromVideoSettings.video.height);
		// importanto!! make sure you leave await on this or you get no video stream;	  
 		await navigator.mediaDevices.getUserMedia(constraintFromVideoSettings)
		.then((streamIn) =>  {
			videO = document.getElementById('videO');// setting this outside of the callback - bad news.
			videO.srcObject = streamIn;
			videO.paused ? videO.play() : null;  //autoplay didnt work.
		})
		.catch((err) => {
			console.log('Video streaming error -- something went wrong ' + err + videO.paused);
		});
	}
	async function loadOpencv() {

		try {
			window.cv = cv;
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

				src = new cv.Mat(constraintFromVideoSettings.video.height, constraintFromVideoSettings.video.width, cv.CV_8UC4);
				matTest = {tmpMat: new cv.Mat(), rectArray: [new cv.Rect()]};
				cap = new cv.VideoCapture(videO);                
				buildInfo = 'Ready to Count!';

				setTimeout(processVideo,0);

			} //build info length
		} catch (err) {
			buildInfo = 'setting up opencv ... ' + err;
			setTimeout(loadOpencv, 1000); // try opencv again.
		}
	}



	function processVideo() {

		try {
			let begin = Date.now();
			if (countState == "COUNT DOMINOS"){
			
				cap.read(src);
	
/*				canvas.getContext('2d', { alpha: true , 
								desynchronized: false ,
								colorSpace: 'srgb' ,
								willReadFrequently: true
								}
						 );
*/
				 cv.imshow(canvasId,src);
			}

			let delay = 1000 / constraintFromVideoSettings.video.frameRate - (Date.now() - begin);
			setTimeout(processVideo, delay);
					
		} catch (err) {
			let errStr = err + " ";
			if (errStr.indexOf('valid canvas element') > 0  ||
			    errStr.indexOf( 'innerText') > 0   )  {  // home button clicked
				videO.srcObject = null;
				console.log('back to home');
				return;	// you most likely selected another link.
			}
			else{
				console.log(err + ' in process video callback "ShowVid1" ' );
	
			}
		}
	}
	
	function tryCountingDots() {
	
		if (countState == "TRY AGAIN"){
			countState = "COUNT DOMINOS";
			ctx.clearRect(0, 0, constraintFromVideoSettings.video.width,
					  constraintFromVideoSettings.video.height);	
/*			canvas.getContext('2d', { alpha: true , 
					desynchronized: false ,
					colorSpace: 'srgb' ,
					willReadFrequently: true
					}
					 ).clearRect(0, 0, constraintFromVideoSettings.video.width,
					  constraintFromVideoSettings.video.height);	
*/
		  buildInfo = "Ready to Count!";
			setTimeout(processVideo,0);
		}
		else {
			getRects(src);
			setTimeout(processVideo,0);

		}
	  
	}
	
	function getRects(matIn) { 
			let contours = new cv.MatVector();
			let heirs    = new cv.Mat()
			let wrkGray = new cv.Mat(matIn.size().height, matIn.size().width, cv.CV_8UC1);
			cv.cvtColor(matIn, wrkGray, cv.COLOR_RGBA2GRAY, 0);
			let startThresh = 150;
			cv.threshold(wrkGray, wrkGray, startThresh, 255,cv.THRESH_BINARY);
			cv.findContours(wrkGray, contours, heirs, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
			let rectArray = [];
			for (let j = 0; j < contours.size(); j++) {

			  	const rect = cv.boundingRect(contours.get(j));

				//if (Math.round(rect.width * rect.height) > 5000 &&
				//    Math.round(rect.width * rect.height) < 20000)

				rectArray.push(rect);
			}
			if (rectArray.length < 1){
				buildInfo = 'There were no Dominos that meet the width and height requirement detected';
				countState = "COUNT DOMINOS";
				//document.getElementById('countButton').innerText = 'COUNT DOMINOS';
			return;
			}
			rectArray.sort( (a,b) => {
				a.y < b.y ? -1 : 0;
				a.x > b.x ? 1 : 0;
			
			});
			countDominoPips(matIn,rectArray);
			contours.delete;wrkGray.delete;heirs.delete;	
			matIn.delete;rectArray.delete;
			return

	}
	
	function countDominoPips (matIn,rectIn) {
		let wrkMat = matIn.clone();
		let kptTbl = [];
		ctx.clearRect(0, 0, constraintFromVideoSettings.video.width, 
						    constraintFromVideoSettings.video.height);	
		rectIn.forEach((dominoDetected,counter) => {
			let pips = processMinEncCirc(wrkMat.roi(dominoDetected),counter);
			if (pips.length > 0) {

				let tempArr = [];   // convert pips keyPoint to an array
//				pips.forEach(keyP => {	if (keyP.size < 20) tempArr.push(keyP)	});

				pips.forEach(keyP => { 
					tempArr.push(keyP);
				});
				// let's get rid of any pips in temparr if they are size 0 or max size is not 
				//  close to average of the size.
				if (tempArr.length > 1){
					kptTbl.push({ rect: dominoDetected, kPtArray: tempArr });
				}
			tempArr.delete;
			}
		});
		if (kptTbl.length == 0) {
			kptTbl.delete;
			wrkMat.delete;canvas.delete
			buildInfo = 'There were no pips on Dominos detected';
			countState = "COUNT DOMINOS";
			return;
		}

		const htmlDispDiv = '<div class="flex flex-row ">';
		const htmlDispVar =  '<div class="basis-1/4 text-end">';
		const htmlDispFix =  '</div>';
		let dominoStr = htmlDispDiv + htmlDispVar + 'Number' + htmlDispFix;
		dominoStr += htmlDispVar + 'Count' + htmlDispFix;
		//dominoStr += htmlDispVar + 'Size' + htmlDispFix;
		//dominoStr += htmlDispVar + 'Max Radius' + htmlDispFix;
		//dominoStr += htmlDispVar + 'Min Radius' + htmlDispFix; 
		dominoStr  += htmlDispFix;
				
			
		totalofAllDominos = 0;
		kptTbl.forEach((dominoRect, num) => {
			// put in the dots on the domino
			let radArray = [];
			let domX = dominoRect.rect.x 
			let domY = dominoRect.rect.y 	
			let wkPt = new cv.Point(domX,domY+20);
	
			
			cv.rectangle(wrkMat,new cv.Point(dominoRect.rect.x, dominoRect.rect.y),
				   new cv.Point(dominoRect.rect.x + dominoRect.rect.width,
				   dominoRect.rect.y + dominoRect.rect.height),
				   clr.Green,1,0);
			dominoRect.kPtArray.forEach((pipCoord) => {
				radArray.push(Math.round(pipCoord.size));
				 // to display radius
				cv.circle(wrkMat, new cv.Point(pipCoord.pt.x+dominoRect.rect.x,pipCoord.pt.y+
				dominoRect.rect.y), 2,
				//(Math.round(pipCoord.size)*0.75),
				 clr.Blue,-1);
			});
			cv.putText(wrkMat,
				 (num + 1).toString() ,
				wkPt,cv.FONT_HERSHEY_SIMPLEX,0.3,clr.Blue2,0.6,cv.LINE_AA,false);
  		
			dominoStr +=  htmlDispDiv +   htmlDispVar + (num + 1) +  htmlDispFix;
			dominoStr +=  htmlDispVar + (dominoRect.kPtArray.length) +  htmlDispFix;
			//dominoStr +=  htmlDispVar +  (Math.round(dominoRect.rect.width * dominoRect.rect.height)) +  htmlDispFix;
			//dominoStr +=  htmlDispVar + (Math.max.apply(Math,radArray)) +  htmlDispFix;
			//dominoStr +=  htmlDispVar + (Math.min.apply(Math,radArray)) +  htmlDispFix;
			dominoStr +=  htmlDispFix ;
			totalofAllDominos += dominoRect.kPtArray.length;
		});

		kptTbl.delete;
		cv.imshow(canvasId, wrkMat);
		wrkMat.delete;canvas.delete;
		buildInfo = 'Total of All Dominos ==> ' + totalofAllDominos + '\n' + dominoStr;
		countState = "TRY AGAIN";
		return;
	}
	function processMinEncCirc(roiIn,dominoCounter){ 
		let xyz = roiIn.clone()
		cv.cvtColor(xyz, xyz, cv.COLOR_RGBA2GRAY, 0);
		cv.threshold(xyz,xyz, 160, 254, cv.THRESH_BINARY);
		let cons = new cv.MatVector();
		let hier = new cv.Mat();
		cv.findContours(xyz, cons, hier, cv.RETR_CCOMP,  cv.CHAIN_APPROX_SIMPLE);
		// we have all the contours for this domino
		let areaArray = [];
		for (let i = 1; i < cons.size(); i++) {
    		let cnt = cons.get(i);
			let minCirc = cv.minEnclosingCircle(cnt); //returns minCirc.radius and minCirc.center.x minCirc.center.y
			// tried approxPolyDP but minEnclosingCircle is better 
			//cv.approxPolyDP(cnt, poly, .01 * cv.arcLength(cnt,true), true);
			// note python approxPolyDP returns a mat and check the poly with len(poly)
			// in javascript we get the same thing by checking poly.size.height ( width is always 1)
			// finding that using cv.matchShapes comparing all contours to the first gives very good results
			// compared to trying to figure out any other way of reducing false dots.
			const resultOfMatch = cv.matchShapes(cnt,cons.get(1),1,0)
			if ( resultOfMatch < 1){
     			areaArray.push({pt: {x: minCirc.center.x,y: minCirc.center.y} ,size: minCirc.radius});

			}
			else{
				
				console.log('match cnt ' + i + ' to contour 1 is ' + resultOfMatch);
			}
			cnt.delete();
		}
		xyz.delete(); hier.delete(); cons.delete(); 
		// once we have all the coordinates check for min max  radius. 
		const maxSize = Math.round(Math.max.apply(Math,areaArray.map((size) => size.size )));
		const minSize = Math.round(Math.min.apply(Math,areaArray.map((size) => size.size )));
		const sum = Math.round(areaArray.reduce((acc,curr) => acc + curr.size,0 ));
		const avg = Math.round(sum/areaArray.length)

		console.log('min/max/sum/avg  is (' + (dominoCounter+1) +  ') ' + minSize + '/' + maxSize + '/' + sum + '/' + avg);
		areaArray.forEach( (val,num) => {if ( val.size  > minSize+5 ){
				areaArray.splice(num,1)
				console.log('took out '  + num  + '  val size ' + val.size);
		}});
		
		return areaArray;

	}
	function updatePlayerTable(){
        // update and get out
		//using roundSelected, selected (index) and adding total of all dominos to table.
		//show it first:
		$playerScore[selected].pScore[roundSelected]  =   totalofAllDominos ;
		buildInfo = $playerScore[selected].playerName + " score has been updated to " + totalofAllDominos;
    }

</script>

<!-- svelte-ignore a11y-missing-content -->
<div>
	<br>
	<button
		type="button" id="countButton" on:click={() => tryCountingDots()}
		class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
       			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
			  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
   			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		{countState}
	</button>
	<button
		type="button" id="UpdatePlayerScore" on:click={() => updatePlayerTable()}
		class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
    			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
   			 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
   			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		Update Player's Score
		</button>

		
</div>
<div class="w-full ml-5 lg:ml-2 grid grid-cols-1  md:grid-cols-2 gap-4 content-normal lg:w-3/4">

	<div >
		<canvas  id={canvasId}   width={constraintFromVideoSettings.video.width} 
			    height={constraintFromVideoSettings.video.height}
				title="Video Canvas {constraintFromVideoSettings.video.width} by {constraintFromVideoSettings.video.height} FPS {$videoSettings.FPS}
				 Using {$videoSettings.label}" >
  		</canvas>

	</div>

	
	<div class="build-info  border rounded-md bg-gray-200 ">	
		<p >	Information Section <br></p>
		<div >
			{@html buildInfo.replace(/\n/g, '<br/>')}  	
	
		</div>

	</div>
</div>
<div>

	<video width={constraintFromVideoSettings.video.width} title='Hidden Video' hidden
	height={constraintFromVideoSettings.video.height} id="videO"> Nothing to See Here 
	<track kind="captions" /> 
	</video>

</div>
