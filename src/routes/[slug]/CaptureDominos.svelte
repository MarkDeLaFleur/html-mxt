<script Lang ts>
	// @ts-nocheck
	import cv from '@techstark/opencv-js';
	import simpleBlobDetector from '@markdelafleur/simpleblobdetector';
	import {goto} from '$app/navigation'
	let buildInfo = 'loading...';
	import { playerScore } from '$lib/myFunctions/TableStore'
	import Canvasresize from './Canvasresize.svelte';
	export let canvasWidth = 0;
	export let canvasHeight = 0;
	export let dominoRound=0;
	const FPS = 6;
	let clr = {};
	export let selected=0;
	$: {console.log($playerScore[selected].playerName + ' ' + $playerScore[selected].pScore[dominoRound])}; 
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
	let src;
	let time0 = setTimeout(loadOpencv, 1000);
	let videO;
	let imageCapture;
	let matTest = {tmpMat: new cv.Mat(), rectArray: [new cv.Rect()]};
	let paramsAndroid = {
			filterByInertia: true,
			filterByCircularity: false,
			filterbyColor: true,
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


	let mediaConstraint = {video: { facingMode: {ideal: "environment"},
							width: { ideal: 800 },  height: {ideal: 600}  }};
	async function loadOpencv() {
		try {
			clearTimeout(time0);
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
				Initvideo();
                cap = new cv.VideoCapture(videO);
				setTimeout(processVideo,0);
			} //build info length
		} catch (err) {
			clearTimeout(time0);
			time0 = setTimeout(loadOpencv, 1000); // try opencv again.
		}
	}
 


	async function Initvideo() {
		stream = await navigator.mediaDevices
			.getUserMedia(mediaConstraint)
			.then((stream) => {
				const track = stream.getVideoTracks()[0];
				videO = document.getElementById('videO');
				window.localStream = stream;
				videO.srcObject = stream;
				streaming = true;
				imageCapture = new ImageCapture(track);
				if (track.getSettings().width < track.getSettings().height) {
					videO.width = track.getSettings().height;
					videO.height = track.getSettings().width;
				} else {
					videO.width = track.getSettings().width;
					videO.height = track.getSettings().height;
				}
				src = new cv.Mat(videO.height, videO.width, cv.CV_8UC4);
				canvasWidth = videO.width;
				canvasHeight = videO.height;
				if (videO.paused) {
					videO.play();
				}
			})
			.catch((err) => {
				console.log('Video streaming error -- something went wrong ' + err);
			});
	}
	function processVideo() {
		try {
			if (document.getElementById("showVid1") === null)  {  // home button clicked
					src.delete;
					window.localStream.getVideoTracks().forEach(track => track.stop());
					// stops the webcam but it seems you have to refresh the home screen to turn off the 
					// indicator light
					goto('/');
					
			};
			let begin = Date.now();
			cap.read(src);
			matTest = putRects(src.roi(new cv.Rect(0,0,parseInt(canvasWidth),parseInt(canvasHeight))));
			cv.imshow("showVid1",matTest.tmpMat);
			src.delete;
			let delay = 1000 / FPS - (Date.now() - begin);
			setTimeout(processVideo, delay);
		} catch (err) {
			console.log(err + ' in process video callback' + document.getElementById("showVid1"));
		}
	}
	function putRects(matIn){
		let contours = new cv.MatVector();
		let wrkGray = new cv.Mat(matIn.size().height, matIn.size().width, cv.CV_8UC1);
		cv.cvtColor(matIn, wrkGray, cv.COLOR_RGBA2GRAY, 0);
		let startThresh = 160;
		cv.threshold(wrkGray, wrkGray, startThresh, 255, cv.THRESH_BINARY);
		cv.findContours(wrkGray, contours, new cv.Mat(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
		let rectArray = [];
		for (let j = 0; j < contours.size(); j++) {
			let rect = cv.boundingRect(contours.get(j));
			if (Math.round(rect.width / rect.height) == 2 && Math.round(rect.width*rect.height) > 1000){
				rectArray.push(rect); 
				cv.rectangle(
					matIn,
					new cv.Point(rect.x, rect.y),
					new cv.Point(rect.x + rect.width, rect.y + rect.height),
					clr.Green,
					2,
					0
				);

			};
		}
		contours.delete;wrkGray.delete;
		
		return {tmpMat: matIn, rectArray: rectArray};
	}
	function countDominoPips () {
		let wrkMat = matTest.tmpMat.clone();
		let canvas = document.getElementById('showVid2');
		canvas.width = wrkMat.size().width;
		canvas.height = wrkMat.size().height;
		canvas.getContext('2d', { alpha: true , 
								desynchronized: false ,
								colorSpace: 'srgb' ,
								willReadFrequently: true} ).clearRect(0, 0, canvas.width, canvas.height);	
	

		let kptTbl = [];
		matTest.rectArray.forEach((dominoDetected) => {
			/**
			 * @type{cv.KeyPoint}
			 */
			// we are going after the rectangle bounding rects captured from wrkMat using the ROI
			let pips = simpleBlobDetector(wrkMat.roi(dominoDetected), params);
			if (pips.length > 0) {
				let tempArr = [];   // convert pips keyPoint to an array
				pips.forEach(keyP => {
					//console.log('key size is ' + keyP.size)
					if (keyP.size < 25) tempArr.push(keyP)
				});
				kptTbl.push({ rect: dominoDetected, kPtArray: tempArr });

				//console.log('Domino  at x/y ' + kptTbl[kptTbl.length-1].rect.x + '/' + kptTbl[kptTbl.length-1].rect.y +
				// ' has ' + kptTbl[kptTbl.length-1].kPtArray.length +  ' pips ' )
	
			}
		});
		if (kptTbl.length == 0) {
			kptTbl.delete;
			canvas.getContext('2d', { alpha: true , desynchronized: false , colorSpace: 'srgb' , willReadFrequently: true} ).clearRect(0, 0, canvas.width, canvas.height);	
			cv.imshow('showVid2', wrkMat);
			wrkMat.delete;
			buildInfo = 'There were no Dominos detected';
			return;
		}
		let dominoStr = '';
		totalofAllDominos = 0;
		kptTbl.forEach((dominoRect, num) => {
			// put in the dots on the domino
			dominoRect.kPtArray.forEach((pipCoord, xNum) => {
				let r = Math.round(pipCoord.size *0.25);
				//console.log('Rect ' + (num+1) + ' Pip Size  ' + Math.round(pipCoord.size))
				//relative to bounding rectangle
				cv.circle(wrkMat, new cv.Point(pipCoord.pt.x+dominoRect.rect.x,pipCoord.pt.y+
				dominoRect.rect.y), r, clr.Green, 2);
			});
		
			let domX = dominoRect.rect.x + dominoRect.rect.width;
			let domY = dominoRect.rect.y + dominoRect.rect.height;
			cv.putText(
				wrkMat,
				'(' + (num + 1).toString() + ')',
				new cv.Point(domX, domY),
				cv.FONT_HERSHEY_SIMPLEX,
				0.5,
				clr.Blue,
				2,
				cv.LINE_AA,
				false
			);
			dominoStr +=  (num + 1) + '==>' + dominoRect.kPtArray.length + ', ';
			totalofAllDominos += dominoRect.kPtArray.length;
		});

		dominoStr = ' \n total of All Dominos ==> ' + totalofAllDominos + '\n' +
		dominoStr.substring(0,dominoStr.lastIndexOf(','));
		kptTbl.delete;
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		cv.imshow('showVid2', wrkMat);
		wrkMat.delete;
		buildInfo = dominoStr;
		return;
	}
	function updatePlayerTable(){
        // update and get out
		//using dominoRound, selected (index) and adding total of all dominos to table.
		//show it first:
		$playerScore[selected].pScore[dominoRound]  =   totalofAllDominos ;
		if (videO.play()) videO.paused;
		window.localStream.getVideoTracks().forEach(track => track.stop());
					// stops the webcam but it seems you have to refresh the home screen to turn off the 
					// indicator light
		goto('/');

    }
	
</script>

<!-- svelte-ignore a11y-missing-content -->
<div class="block overflow-auto border text-gray-700 border-red-400 ml-10 px-4  w-3/4 h-24 build-info">	
		<p >	Information Section <br>
		{@html buildInfo.replace(/\n/g, '<br />')}  
		</p>
</div>
<div>
		<br>
		<button
			type="button" id="countButton" on:click={countDominoPips}
			class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
         			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
       				  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		Count Dominos
		</button>
		<button
			type="button" id="UpdatePlayerScore" on:click={updatePlayerTable}
			class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
         			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
        			 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		Update Player's Score
		</button>
		
</div>
	
		<div class="block text-gray-700 text-left border-gray-400  px-4 py-2 pt-3">
			<Canvasresize canvasId="showVid1" bind:canvasWidth bind:canvasHeight />
			<canvas id="showVid2" class="ml-5 lg:ml-10 border" title="Big Domino {canvasWidth} / {canvasHeight}">
			</canvas>
			<canvas id="showGray"  class="ml-5 lg:ml-10 border " title="Gray Boy {canvasWidth} / {canvasHeight}">
			</canvas> 
		</div>

		<div class="text-gray-700 text-left border-gray-400  px-4 py-2 ">
			<video hidden id="videO"> howdy <track kind="captions" /> </video>
		</div>
	


	


