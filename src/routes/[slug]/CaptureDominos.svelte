<script Lang ts>
	// @ts-nocheck
	import cv from '@techstark/opencv-js';
	import simpleBlobDetector from '@markdelafleur/simpleblobdetector';
	import DrawRect from './DrawRect.svelte';
	import {goto} from '$app/navigation'
	let buildInfo = 'loading...';
	import { playerScore } from '../TableStore.js'
	export let dominoRound=0;
	const FPS = 30;
	let clr = {};
	export let selected=0;
	$: {console.log($playerScore[selected].playerName + ' ' + $playerScore[selected].pScore[dominoRound])}
	let drawRectVars;   //holder for DrawRect components startPosition and endPosition
	let hoochie;
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

  // change in init video to width height
	//let mediaConstraint = {
	//	video: { width: { ideal: 700 }, height: { ideal: 300 }, facingMode: { ideal: 'environment' } }
	//};
	let mediaConstraint = {video: { facingMode: {ideal: "environment"},
							width: { ideal: 800 },  height: {ideal: 600}  }};
	async function loadOpencv() {
		try {
			clearTimeout(time0);
			window.cv = cv;
			buildInfo = cv.getBuildInformation();
			if (buildInfo.length > 0) {
				buildInfo = 'OPENCV Loaded..';
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
				document.getElementById('countButton').addEventListener('click', function () {
					findRects();
					
				});
				document.getElementById('UpdatePlayerScore').addEventListener('click', function () {
					updatePlayerTable();
					
				});

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
				hoochie = videO.width;
				if (videO.paused) {
					videO.play();
				}
			})
			.catch((err) => {
				console.log('Video streaming error -- something went wrong ' + err);
			});
	}
	function processVideo() {
		if (document.getElementById("showVid1") == null)  {  // home button clicked
					src.delete;
					window.localStream.getVideoTracks().forEach(track => track.stop());
					// stops the webcam but it seems you have to refresh the home screen to turn off the 
					// indicator light
					return;
			}

		try {
			let begin = Date.now();
			cap.read(src);
			// drawing a rectangle uses 2 Point tuples but ROI uses RECT
			cv.rectangle(src,new cv.Point(drawRectVars.startPosition.col,drawRectVars.startPosition.row),
			new cv.Point((drawRectVars.width+drawRectVars.startPosition.col),
							(drawRectVars.height+drawRectVars.startPosition.row)),clr.Green,2);
			cv.imshow("showVid1",src);
			// schedule the next one.
			let delay = 1000 / FPS - (Date.now() - begin);
			setTimeout(processVideo, delay);
		} catch (err) {
			console.log(err + ' in process video callback');
		}
	}
	
	function findRects() {
		console.log('selected is ' + selected)
		let tmpMat = src.clone();
		let wrkMat = new cv.Mat();
		if (drawRectVars.width != 0 	) {
            const tRect = new cv.Rect(drawRectVars.startPosition.col,drawRectVars.startPosition.row,
			drawRectVars.width,drawRectVars.height)
			wrkMat = tmpMat.roi(tRect);
		}
		else { wrkMat = tmpMat.clone();}	
		let srcGray = new cv.Mat(wrkMat.size().height, wrkMat.size().width, cv.CV_8UC1);
		let contours = new cv.MatVector();
		console.log('srcGray is ' + srcGray.size().height + ' by ' + srcGray.size().width);
		console.log('tmpMat is height/width ' + tmpMat.size().height + ' / ' + tmpMat.size().width )
		console.log('srcGray height/width is ' + srcGray.size().height + '/' + srcGray.size().width )
		let params = {
			faster: true,
			filterByInertia: false,
			filterByCircularity: true,
			minThreshold: 100,
			maxThreshold: 200,
			filterByColor: false
		};
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
		let heirs = new cv.Mat();
		let kptTblVal;
		let kptTbl = [];
		let canvas = document.getElementById('showVid2');
		canvas.width = wrkMat.size().width;
		canvas.height = wrkMat.size().height;
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);	
		cv.cvtColor(wrkMat, srcGray, cv.COLOR_BGR2GRAY, 0);
		let startThresh = 160;
		cv.threshold(srcGray, srcGray, startThresh, 255, cv.THRESH_BINARY);
		cv.findContours(srcGray, contours, heirs, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
		let rectArray = [];
		let showArea = wrkMat ; // wrkMat.clone();
		
		for (let j = 0; j < contours.size(); j++) {
			let rect = cv.boundingRect(contours.get(j));
			if (Math.round(rect.width) > 99){
				rectArray.push(rect);
				cv.rectangle(
					showArea,
					new cv.Point(rect.x, rect.y),
					new cv.Point(rect.x + rect.width, rect.y + rect.height),
					clr.Green,
					2,
					0
				);
				cv.putText(
					showArea,
					'(' + Math.round(rect.width) + ')',
					new cv.Point(rect.x, rect.y),
					cv.FONT_HERSHEY_PLAIN,
					2,
					clr.Black,
					1,
					cv.LINE_AA,
					0
				);
			}
		}

		cv.imshow('showGray', showArea);
		showArea.delete;
		// 'them' are the rectangles around a domino
		rectArray.forEach((them, cT) => {
			/**
			 * @type{cv.KeyPoint}
			 */
			let pips = simpleBlobDetector(wrkMat.roi(them), params);
			if (pips.length > 0) {
				//console.log("pips on rectangle  " + cT +  " == " + pips.length +
				//     " @ x,y " + them.x + ','+ them.y);
				let kptList = [];
				pips.forEach((kPt) => {
					let tmpPt = kPt;
					//console.log('kPt point x,y ' + ~~kPt.pt.x + ',' + ~~kPt.pt.y);
					tmpPt.pt.x += them.x;
					tmpPt.pt.y += them.y;
					kptList.push(tmpPt);
					// console.log('pip x,y ' + ~~tmpPt.pt.x+ ','+  ~~tmpPt.pt.y +
					// " size " + tmpPt.size)
				});
				kptTblVal = { rect: them, kPtArray: kptList };
				kptTbl.push(kptTblVal);
			}
		});
		contours.delete;heirs.delete;srcGray.delete;tmpMat.delete;

		if (kptTbl.length == 0) {
			kptTbl.delete;
			cv.imshow('showVid2', wrkMat);
			wrkMat.delete;
			buildInfo = 'There were no Dominos detected';
			return;
		}
		//console.log(kptTbl.length + " is kptTbl length")
		let dominoStr = '';
		totalofAllDominos = 0;
		kptTbl.forEach((cc, num) => {
			// put in the dots on the domino
			cc.kPtArray.forEach((thing, xNum) => {
				let r = Math.round(thing.size * 0.25);
				//relative to bouding rectangle
				cv.circle(wrkMat, thing.pt, r, clr.Green, 2);
			});

			//put the green box around the domino
			cv.rectangle(
				wrkMat,
				new cv.Point(cc.rect.x, cc.rect.y),
				new cv.Point(cc.rect.x + cc.rect.width, cc.rect.y + cc.rect.height),
				clr.Green,
				2,
				0
			);

			// put the domino number near the right bottom
			let domX = cc.rect.x + cc.rect.width;
			let domY = cc.rect.y + cc.rect.height;
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
			dominoStr += '#(' + (num + 1) + ')__' + cc.kPtArray.length + ', ';
			totalofAllDominos += cc.kPtArray.length;
		});

		dominoStr += ' \n total of All Dominos ==> ' + totalofAllDominos;
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
		console.log( 'selected ' + selected + ' Round ' + dominoRound + ' Player Name ' + 
		$playerScore[selected].playerName + ' current score ' + 
		$playerScore[selected].pScore[dominoRound] + ' new Total ' +
		'updated score')
		if (!Number.isNaN($playerScore[selected].pScore[dominoRound] ) ) {
		$playerScore[selected].pScore[dominoRound]  = parseInt($playerScore[selected].pScore[dominoRound]) +
 		    totalofAllDominos ;}
		else {$playerScore[selected].pScore[dominoRound] =  totalofAllDominos};

		window.localStream.getVideoTracks().forEach(track => track.stop());
					// stops the webcam but it seems you have to refresh the home screen to turn off the 
					// indicator light
		goto('/');

    }
	
</script>

<!-- svelte-ignore a11y-missing-content -->
<div >	
		<p class="block overflow-auto text-gray-700 border-red-400  px-4  w-full h-12 build-info" >	
		{@html buildInfo.replace(/\n/g, '<br />')} <br />
		</p>
</div>
<div >
		<button
			type="button" id="countButton"
			class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
         			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
       				  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		Count Dominos
		</button>
		<button
			type="button" id="UpdatePlayerScore"
			class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
         			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
        			 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
		Update Player's Score
		</button>
</div>
	
		<div class="block text-gray-700 text-left border-gray-400  px-4 py-2 pt-2">
			<DrawRect bind:this={drawRectVars} canvasId="showVid1" bind:canvasWidth={hoochie}/>
			<canvas id="showVid2" title="Big Domino {hoochie}">
			</canvas>
			<canvas id="showGray" title="Gray Boy {hoochie}">
			</canvas> 
		</div>

		<div class="text-gray-700 text-left border-gray-400  px-4 py-2 ">
			<video hidden id="videO"> howdy <track kind="captions" /> </video>
			<canvas id="wrkCanvas" title="workCanvas " hidden/>
		</div>
	


	


