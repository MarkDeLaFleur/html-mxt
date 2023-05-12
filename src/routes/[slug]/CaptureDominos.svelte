<script Lang ts>
	// @ts-nocheck
	//  scalar,getbuildinfo,mat
	import cv from '@techstark/opencv-js';
	import { videoSettings } from '../../lib/myFunctions/VideoStore';
	import {goto} from '$app/navigation'
	import { playerScore } from '$lib/myFunctions/TableStore';
	export let canvasId="showVid1";
	export let dominoRound=0;
	let clr = {};
	export let selected=0;
	let totalofAllDominos = 0;
	let cl = 0;
	let buildInfo = 'loading...';
	
	/**
	 * @type {HTMLVideoElement}
	 */
	let videO;
	let cap;
	let	canvas;
	
	//let imageCapture;
	let matTest; 
	let constraintFromVideoSettings = {video: {deviceId: "" , width: 640, height: 480,	frameRate: 15}};
	let src;
	initVideo();
	setTimeout(loadOpencv,0);
	async function initVideo() {

		constraintFromVideoSettings.video.deviceId =  $videoSettings.deviceId;
		constraintFromVideoSettings.video.width = 640;
		constraintFromVideoSettings.video.width = $videoSettings.canvasWidth;
		constraintFromVideoSettings.video.frameRate = $videoSettings.FPS;
		constraintFromVideoSettings.video.height = Math.round($videoSettings.canvasWidth/1.3333);
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
			if(document.getElementById('countButton').innerText == 'COUNT DOMINOS'){
				cap.read(src);
				canvas.getContext('2d', { alpha: true , 
								desynchronized: false ,
								colorSpace: 'srgb' ,
								willReadFrequently: true
								}
						 );	
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
		if (document.getElementById('countButton').innerText != 'COUNT DOMINOS'){
			document.getElementById('countButton').innerText = 'COUNT DOMINOS';
			document.getElementById('countButton').innerText = document.getElementById('countButton').innerText;
			canvas.getContext('2d', { alpha: true , 
					desynchronized: false ,
					colorSpace: 'srgb' ,
					willReadFrequently: true
					}
					 ).clearRect(0, 0, constraintFromVideoSettings.video.width,
					  constraintFromVideoSettings.video.height);	
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
			let startThresh = 165;
			cv.threshold(wrkGray, wrkGray, startThresh, 255, cv.THRESH_BINARY);
			cv.findContours(wrkGray, contours, heirs, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
			let rectArray = [];
			for (let j = 0; j < contours.size(); j++) {

				const rect = cv.boundingRect(contours.get(j));
				if (Math.round(rect.width * rect.height) > 5000 &&
				    Math.round(rect.width * rect.height) < 20000)
					{rectArray.push(rect);}
			}
			if (rectArray.length < 1){
				buildInfo = 'There were no Dominos that meet the width and height requirement detected';
				document.getElementById('countButton').innerText = 'COUNT DOMINOS';
			return;
			} 

			countDominoPips(matIn,rectArray);
			contours.delete;wrkGray.delete;heirs.delete;	
			matIn.delete;rectArray.delete;
			return

	}
	
	function countDominoPips (matIn,rectIn) {
		let wrkMat = matIn.clone();
		let kptTbl = [];
		canvas.getContext('2d', { alpha: true , 
				desynchronized: false ,
				colorSpace: 'srgb' ,
				willReadFrequently: true
				}
				).clearRect(0, 0, constraintFromVideoSettings.video.width, 
								  constraintFromVideoSettings.video.height);	
		rectIn.forEach((dominoDetected,counter) => {
			let pips = contoursApprox(wrkMat.roi(dominoDetected));
			if (pips.length > 0) {
				let tempArr = [];   // convert pips keyPoint to an array
//				pips.forEach(keyP => {	if (keyP.size < 20) tempArr.push(keyP)	});

				pips.forEach(keyP => { 
					tempArr.push(keyP);
				});
				if (tempArr.length > 1){
					kptTbl.push({ rect: dominoDetected, kPtArray: tempArr });
					//could take this out and just output ROI's and pips without the detected offset
				//	cv.rectangle(wrkMat,new cv.Point(dominoDetected.x, dominoDetected.y),
				//				   new cv.Point(dominoDetected.x + dominoDetected.width,
				//				   dominoDetected.y + dominoDetected.height),
				//				   clr.Green,2,0);
				}

	
			tempArr.delete;
			}
		});
		if (kptTbl.length == 0) {
			kptTbl.delete;
			wrkMat.delete;canvas.delete
			buildInfo = 'There were no pips on Dominos detected';
			document.getElementById('countButton').innerText = 'COUNT DOMINOS';
			return;
		}

		const htmlDispDiv = '<div class="flex flex-row ">';
		const htmlDispVar =  '<div class="basis-1/5 text-end">';
		const htmlDispFix =  '</div>';
		let dominoStr = htmlDispDiv + htmlDispVar + 'Number' + htmlDispFix;
		dominoStr += htmlDispVar + 'Count' + htmlDispFix;
		dominoStr += htmlDispVar + 'Size' + htmlDispFix;
		dominoStr += htmlDispVar + 'Max Radius' + htmlDispFix;
		dominoStr += htmlDispVar + 'Min Radius' + htmlDispFix + htmlDispFix;
				
			
		totalofAllDominos = 0;
		kptTbl.forEach((dominoRect, num) => {
			// put in the dots on the domino
			let radArray = [];
			cv.rectangle(wrkMat,new cv.Point(dominoRect.rect.x, dominoRect.rect.y),
				   new cv.Point(dominoRect.rect.x + dominoRect.rect.width,
				   dominoRect.rect.y + dominoRect.rect.height),
				   clr.Green,2,0);

			dominoRect.kPtArray.forEach((pipCoord) => {
				//console.log('Rect ' + (num+1) + ' Pip Size  ' + Math.round(pipCoord.size))
				//relative to bounding rectangle
				radArray.push(Math.round(pipCoord.size)); // to display radius
				cv.circle(wrkMat, new cv.Point(pipCoord.pt.x+dominoRect.rect.x,pipCoord.pt.y+
				dominoRect.rect.y), (Math.round(pipCoord.size)*.15), clr.Green,2);
			});
			let domX = dominoRect.rect.x + dominoRect.rect.width;
			let domY = dominoRect.rect.y + dominoRect.rect.height;
			let wkPt = new cv.Point(domX,domY);
			cv.putText(wrkMat,
				'(' + (num + 1).toString() + ')',
				wkPt,cv.FONT_HERSHEY_SIMPLEX,0.5,clr.Blue,2,cv.LINE_AA,false);

	
  			dominoStr +=  htmlDispDiv +   htmlDispVar + (num + 1) +  htmlDispFix;
			dominoStr +=  htmlDispVar + (dominoRect.kPtArray.length) +  htmlDispFix;
			dominoStr +=  htmlDispVar +  (Math.round(dominoRect.rect.width * dominoRect.rect.height)) +  htmlDispFix;
			dominoStr +=  htmlDispVar + (Math.max.apply(Math,radArray)) +  htmlDispFix;
			dominoStr +=  htmlDispVar + (Math.min.apply(Math,radArray)) +  htmlDispFix;
			dominoStr +=  htmlDispFix ;
			totalofAllDominos += dominoRect.kPtArray.length;
		});

		kptTbl.delete;
		cv.imshow(canvasId, wrkMat);
		wrkMat.delete;canvas.delete;
		buildInfo = 'Total of All Dominos ==> ' + totalofAllDominos + '\n' + dominoStr;
		document.getElementById('countButton').innerText = 'TRY AGAIN';
		return;
	}
	function contoursApprox(roiIn){ 
		let xyz = roiIn.clone()
		cv.cvtColor(xyz, xyz, cv.COLOR_RGBA2GRAY, 0);
		cv.threshold(xyz,xyz, 165, 254, cv.THRESH_BINARY);
		let cons = new cv.MatVector();
		let hier = new cv.Mat();
		cv.findContours(xyz, cons, hier, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
		// we have all the contours for this domino
		let areaArray = [];
		for (let i = 0; i < cons.size(); i++) {
    		let poly = new cv.Mat();
    		let cnt = cons.get(i);
    		cv.approxPolyDP(cnt, poly, .02 * cv.arcLength(cnt,true), true);
			// note python approxPolyDP returns a mat and check the poly with len(poly)
			// in javascript we get the same thing by checking poly.size.height ( width is always 1)
			// here we check anything that has a heigh > 4 as being a circle
			
			const [x,y] = poly.intPtr(0);
			const polyRad = Math.round(Math.sqrt(4 * cv.contourArea(poly)/Math.PI));
		//	if (poly.size().height < 8){
		    if (polyRad < 23){
				//hopefully just contours that are circles.
				console.log('Domino Pts Size vertices ' + i + '===> '+ 
					x + '/' + y +',' + polyRad + 
					',' + poly.size().height);	
				
				areaArray.push({pt: {x: x,y: y} ,size: polyRad});

			}
			
			cnt.delete(); poly.delete();
		}
		xyz.delete(); hier.delete(); cons.delete(); 
		return areaArray;

	}
	function updatePlayerTable(){
        // update and get out
		//using dominoRound, selected (index) and adding total of all dominos to table.
		//show it first:
		$playerScore[selected].pScore[dominoRound]  =   totalofAllDominos ;
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
		Count Dominos
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
<div class="grid grid-flow-row sm:grid-flow-col px-2 gap-3">
	<div class="border rounded border-green-800 w-px">
		<canvas id={canvasId}   width={constraintFromVideoSettings.video.width} 
			    height={constraintFromVideoSettings.video.height}
				title="Big Daddy {constraintFromVideoSettings.video.width} by
						  {constraintFromVideoSettings.video.height} FPS 
						  {$videoSettings.FPS} Using {$videoSettings.label}" >
  		</canvas>

	</div>

	
	<div class="border text-gray-700 border-red-400  w-1/2 h-auto build-info">	
		<p class="text-gray-700 text-center">	Information Section <br></p>
		<div class="text-gray-900 text-start">
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
