<script Lang ts>
	// @ts-nocheck
	import cv from '@techstark/opencv-js';
	import simpleBlobDetector from '@markdelafleur/simpleblobdetector';
	import {goto} from '$app/navigation'
	let buildInfo = 'loading...';
	import { playerScore } from '$lib/myFunctions/TableStore'
	import Canvasresize from './Canvasresize.svelte';
	export let canvasId="showVid1";
	export let canvasWidth;
	export let canvasHeight;
	export let dominoRound=0;
	export let FPS = 30;
	let clr = {};
	export let selected=0;
//$: {console.log($playerScore[selected].playerName + ' ' + $playerScore[selected].pScore[dominoRound])}; 
	let startPosition = {col: 0, row: 0};
	let endPosition = {col: 0, row: 0};
	let tmpPts;
	let totalofAllDominos = 0;
	let cl = 0;

	/**
	 * @type {HTMLVideoElement}
	 */
	let streaming = false;
	let stream;
	let cap;
	let videO;
	//let imageCapture;
	let matTest; 
/*
	let paramsAndroid = {
			filterByInertia: true,
			filterByCircularity: false,
			filterbyColor: false,
			filterByConvexity: true,
			filterByArea: true,
			maxConvexity: 3.4028234663852886,
			maxInertiaRatio: 3.4028234663852886,
			minCircularity: 0.800000011920929,
			minArea: 70,
			maxArea: 300,
			minConvexity: 0.800000011920929,
			minInertiaRatio: 0.10000000149011612,
			minDistBetweenBlobs: 10,
			minRepeatability: 2
		};

	let params = {
			faster: true,
			filterByInertia: false,
			filterByCircularity: true,
			minThreshold: 100,
			maxThreshold: 200,
			minDistBetweenBlobs: 10,
			filterByColor: false
		};
*/
	let noConstraint = {video:true,  facingMode: {ideal: "environment"}};
/*	let mediaConstraint = {video: { facingMode: {ideal: "environment"},
							width: { min: 640, max: 1920 }, 
							height: {min: 480, max: 1080},
						    frameRate: { ideal: 10, max: 30 }  }};
*/
	let src;
	setTimeout(loadOpencv,0);
	async function loadOpencv() {
		try {
			window.cv = cv;
			buildInfo = cv.getBuildInformation();
			if (buildInfo.length > 0) {
				buildInfo = 'Ready to Count!';
				clr = {
					Red: new cv.Scalar(255.0, 0.0, 0.0, 255.0),
					Blue: new cv.Scalar(0.0, 0.0, 255.0, 255.0),
					Blue2: new cv.Scalar(155.0, 0.0, 0.0, 255.0),
					Green: new cv.Scalar(0.0, 255.0, 0.0, 255.0),
					Black: new cv.Scalar(50.0, 50.0, 0.0, 255.0),
					Yellow: new cv.Scalar(255.0, 160.0, 0.0, 255.0),
					White: new cv.Scalar(0.0, 0.0, 0.0, 255.0)
				};
				initVideo();
                cap = new cv.VideoCapture(videO);
				matTest = {tmpMat: new cv.Mat(), rectArray: [new cv.Rect()]};
				src = new cv.Mat(canvasHeight, canvasWidth, cv.CV_8UC4);
				setTimeout(processVideo,0);
			} //build info length
		} catch (err) {
			setTimeout(loadOpencv, 1000); // try opencv again.
		}
	}
 


	async function initVideo() {
		stream = await navigator.mediaDevices
			.getUserMedia (noConstraint)  //(mediaConstraint)
			.then((stream) => {
				//const track = stream.getVideoTracks()[0];
				videO = document.getElementById('videO');
				//window.localStream = stream;
				videO.srcObject = stream;
				//videO.width = track.getSettings().width;
				//videO.height = track.getSettings().height;
				//videO.width = 640; videO.height = 480;
				//FPS = track.getSettings().frameRate;
				streaming = true;
				//imageCapture = new ImageCapture(videO);
				//canvasWidth = videO.width;
				//canvasHeight = videO.height;

				if (videO.paused) {
					videO.play();
				}
			})
			.catch((err) => {
				console.log('Video streaming error -- something went wrong ' + err);
				setTimeout(loadOpencv, 1000); // try opencv again.

			});
	}
	function processVideo() {

		try {
			let begin = Date.now();
			if(document.getElementById('countButton').innerText == 'COUNT DOMINOS'){
				cap.read(src);
				let matTmp = putRects(src);
				if (matTmp.tmpMat != null){
					matTest.tmpMat = matTmp.tmpMat;
					cv.imshow("showVid1",matTest.tmpMat);
					if (matTmp.rectArray.length > 0 ){
						matTest.rectArray = matTmp.rectArray;
					}
					else{ matTest.rectArray = [];
					}
				
				}
			}
			let delay = 1000 / FPS - (Date.now() - begin);
			setTimeout(processVideo, delay);
					
		} catch (err) {
			let errStr = err+"x";
			if (errStr.indexOf('valid canvas element') > 0)  {  // home button clicked
				window.localStream.getVideoTracks().forEach(track => track.stop());
				goto('/');
			}
			console.log(err + ' in process video callback "ShowVid1" ' );
		}
	}
	function putRects(matIn){ 
			let contours = new cv.MatVector();
			let heirs    = new cv.Mat()
			let wrkGray = new cv.Mat(matIn.size().height, matIn.size().width, cv.CV_8UC1);
			cv.cvtColor(matIn, wrkGray, cv.COLOR_RGBA2GRAY, 0);
			let startThresh = 160;
			cv.threshold(wrkGray, wrkGray, startThresh, 255, cv.THRESH_BINARY);
			cv.findContours(wrkGray, contours, heirs, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);
			let rectArray = [];
			for (let j = 0; j < contours.size(); j++) {
				const rect = cv.boundingRect(contours.get(j));
				if (Math.round(rect.width / rect.height) == 2 && Math.round(rect.width*rect.height) > 1000){
					rectArray.push(rect);
				}
			}
			rectArray.forEach(rect =>{
				let wkPtStrt = new cv.Point(rect.x, rect.y);
				let wkRectStrt =  new cv.Point(rect.x + rect.width, rect.y + rect.height);
				cv.rectangle(matIn,wkPtStrt,wkRectStrt,clr.Green,2,0);

			});
			contours.delete;wrkGray.delete;heirs.delete;		
			return {tmpMat: matIn, rectArray: rectArray}

	}
	function countDominoPips (matIn,rectIn) {
		if (document.getElementById('countButton').innerText == 'COUNT DOMINOS'){
			document.getElementById('countButton').innerText = 'TRY AGAIN';
		}
		else{
			document.getElementById('countButton').innerText = 'COUNT DOMINOS';
			return;
		}
		if (rectIn.length < 1){
			buildInfo = 'There were no Dominos detected';
			document.getElementById('countButton').innerText = 'COUNT DOMINOS';
			return;
		} 
		
		let wrkMat = matIn.clone();
		let kptTbl = [];
		let canvas = document.getElementById('showVid1');
		canvas.width = wrkMat.size().width;
		canvas.height = wrkMat.size().height;
		canvas.getContext('2d', { alpha: true , 
								desynchronized: false ,
								colorSpace: 'srgb' ,
								willReadFrequently: true
								}
						 ).clearRect(0, 0, canvas.width, canvas.height);	

		rectIn.forEach((dominoDetected) => {
			/**
			 * @type{cv.KeyPoint}
			 */
			// we are going after the rectangle bounding rects captured from wrkMat using the ROI
			let pips = simpleBlobDetector(wrkMat.roi(dominoDetected));
			if (pips.length > 0) {
				let tempArr = [];   // convert pips keyPoint to an array
				pips.forEach(keyP => {	if (keyP.size < 20) tempArr.push(keyP)	});
				kptTbl.push({ rect: dominoDetected, kPtArray: tempArr });
				tempArr.delete;
				//console.log('Domino  at x/y ' + kptTbl[kptTbl.length-1].rect.x + '/' + kptTbl[kptTbl.length-1].rect.y +
				// ' has ' + kptTbl[kptTbl.length-1].kPtArray.length +  ' pips ' )
			}
		});
		if (kptTbl.length == 0) {
			kptTbl.delete;
			wrkMat.delete;canvas.delete
			buildInfo = 'There were no Dominos detected';
			document.getElementById('countButton').innerText = 'COUNT DOMINOS';
			return;
		}
		let dominoStr = '';
		totalofAllDominos = 0;
		kptTbl.forEach((dominoRect, num) => {
			// put in the dots on the domino
			dominoRect.kPtArray.forEach((pipCoord) => {
				let r = Math.round(pipCoord.size);
				//console.log('Rect ' + (num+1) + ' Pip Size  ' + Math.round(pipCoord.size))
				//relative to bounding rectangle
				cv.circle(wrkMat, new cv.Point(pipCoord.pt.x+dominoRect.rect.x,pipCoord.pt.y+
				dominoRect.rect.y), (r*.15), clr.Green,-1);
			});
		
			let domX = dominoRect.rect.x + dominoRect.rect.width;
			let domY = dominoRect.rect.y + dominoRect.rect.height;
			let wkPt = new cv.Point(domX,domY);
			cv.putText(
				wrkMat,
				'(' + (num + 1).toString() + ')',wkPt,cv.FONT_HERSHEY_SIMPLEX,0.5,clr.Blue,
				2,cv.LINE_AA,false);
			dominoStr +=  (num + 1) + '==>' + dominoRect.kPtArray.length + ', ';
			totalofAllDominos += dominoRect.kPtArray.length;
		});

		dominoStr = ' \n total of All Dominos ==> ' + totalofAllDominos + '\n' +
		dominoStr.substring(0,dominoStr.lastIndexOf(','));
		kptTbl.delete;
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		cv.imshow('showVid1', wrkMat);
		wrkMat.delete;canvas.delete;
		buildInfo = dominoStr;
		return;
	}
	
	function updatePlayerTable(){
        // update and get out
		//using dominoRound, selected (index) and adding total of all dominos to table.
		//show it first:
		$playerScore[selected].pScore[dominoRound]  =   totalofAllDominos ;
		buildInfo = $playerScore[selected].playerName + " score has been updated to " +totalofAllDominos;
    }
	
</script>

<!-- svelte-ignore a11y-missing-content -->
<p class="text-gray-700 text-justify ml-10">	Information Section <br></p>
	
<div class="block overflow-auto border text-gray-700 border-red-400 ml-10 px-4  w-3/4 h-24 build-info">	
		{@html buildInfo.replace(/\n/g, '<br />')}  
</div>
<div>
	<br>
	<button
		type="button" id="countButton" on:click={() => countDominoPips(matTest.tmpMat,matTest.rectArray)}
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
<div class="block text-gray-700 text-left border-gray-400  px-4 py-2 pt-3">
		<Canvasresize bind:canvasId bind:canvasWidth bind:canvasHeight bind:FPS />
</div>
<div class="text-gray-700 text-left border-gray-400  px-4 py-2 ">
		<video hidden width={canvasWidth} height={canvasHeight} id="videO"> howdy <track kind="captions" /> </video>
</div>