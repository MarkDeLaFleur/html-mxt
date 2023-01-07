<script Lang=ts>
    // @ts-nocheck
import cv from "@techstark/opencv-js"
import { copyTo } from "@techstark/opencv-js";
//import utils from "@opencv.js/utils"
import simpleBlobDetector from "@markdelafleur/simpleblobdetector";
let buildInfo = "loading..."
//let imageCapture;


let lowArea = 2000;
let highArea = 30000;
const FPS = 15;
let clr = {};
    /**
	 * @type {HTMLVideoElement}
	 */


let time0 = setTimeout((loadOpencv), 1000);
let imageCapture;
let mediaConstraint =  {video: { width: {ideal: 640}, 
                                facingMode: {ideal: "environment"},}  };
//let mediaConstraintX = {video: { facingMode: {ideal: "environment"},}  };
let boxSetting = "flex flex-col basis-auto border-4 border-lime-400"
async function loadOpencv(){
    try {
        clearTimeout(time0);
        (window ).cv = cv;
        buildInfo = cv.getBuildInformation();
        if (buildInfo.length > 0) {
            buildInfo = 'OPENCV Loaded..';
            clr = { Red  :  new cv.Scalar(255.0,0.0,0.0,255.0),
                    Blue :  new cv.Scalar(0.0,0.0,255.0,255.0),
                    Blue2:  new cv.Scalar(155.0,0.0,0.0,255.0),
                    Green:  new cv.Scalar(0.0,255.0,0.0,255.0),
                    Black:  new cv.Scalar(50.0,50.0,0.0,255.0),
                    Yellow: new cv.Scalar(255.0,160.0,0.0,255.0),
                    White:  new  cv.Scalar(0.0,0.0,0.0,255.0)};
            Initvideo();
            document.getElementById('countButton')
                .addEventListener('click',function (){
                         grabIt();
                });
        }  //build info length
    }
    catch (err) {
        clearTimeout(time0);
        time0 = setTimeout(loadOpencv,1000);  // try opencv again.
    }
}
async function Initvideo (){
    const stream = await navigator.mediaDevices.getUserMedia(
            mediaConstraint).then((stream) => {
             const track = stream.getVideoTracks()[0];
             let videO = document.getElementById('videO');
             videO.srcObject = stream;
             videO.width = track.getSettings().width;
             
            imageCapture = new ImageCapture(track);
                
                buildInfo = 'track label '+ track.label + 
                            '\n track width/height ' + track.getSettings().width +
                            ' / '+ track.getSettings().height +
                            '\n videO width/height ' + videO.width +
                            ' / ' + videO.height +
                            ' videO videowidth/Height'+ videO.videoWidth +
                            ' / ' + videO.videoHeight;
    
                if(videO.paused) { videO.play();}
           }
            ).catch((err) => {
                console.log("Video streaming error -- something went wrong "+ err);
            });
}
function grabIt(){
    imageCapture.grabFrame()
    .then( imageBitmap =>{
        
        let canvas = document.getElementById('showVid1');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        console.log('grab it canvas width/height ' + canvas.width +
                     ' / ' + canvas.height + 
                    ' imagebitmap width/height ' + imageBitmap.width +
                    ' / ' + imageBitmap.height); 
        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);   
        canvas.getContext('2d').drawImage(imageBitmap,0,0);
        let srcIn = cv.imread(canvas);
        let srcResize = new cv.Mat();
        cv.resize(srcIn,srcResize,new cv.Size(700,900),0,0,cv.INTER_AREA);
        cv.cvtColor(srcResize,srcResize,cv.COLOR_RGB2BGR,0);
        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
        buildInfo = findRects(srcResize);
        srcIn.delete;srcResize.delete;
    })
    .catch(error => console.log('grabit error '+ error));
}


function findRects(wrkMat){
    let srcGray = new cv.Mat(wrkMat.cols,wrkMat.rows,cv.CV_8UC1);
    let contours = new cv.MatVector();
    let params = {faster: true, filterByInertia: false, filterByCircularity: true,
        minThreshold: 100,  maxThreshold:200, filterByColor: false,
        };
    let paramsAndroid = {filterByInertia: true, filterByCircularity: false,
        filterbyColor: true,filterByConvexity:true,filterByArea: true,
        maxConvexity: 3.4028234663852886,maxInertiaRatio: 3.4028234663852886,
        minCircularity: 0.800000011920929,minArea: 70,maxArea: 300,
        minConvexity: 0.800000011920929,minInertiaRatio: 0.10000000149011612,
        minDistBetweenBlobs: 10,minRepeatability: 2};
    let heirs = new cv.Mat();
    let kptTblVal;
    let kptTbl = [];
    //let keyPts = simpleBlobDetector(wrkMat,params);
    cv.cvtColor(wrkMat,srcGray,cv.COLOR_BGR2GRAY,0);
    let startThresh = 160;
    cv.threshold(srcGray,srcGray,startThresh,255,cv.THRESH_BINARY);

    cv.findContours(srcGray,contours,heirs,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE);
    let rectArray = []
    let showArea = wrkMat.clone();
    let showSettings =  "Min Area " + lowArea + " Max Area " + highArea;
    cv.putText(showArea,showSettings, 
                new cv.Point(20,100),cv.FONT_HERSHEY_SCRIPT_COMPLEX,
                1,clr.Yellow,3,cv.LINE_AA,false);   
    
    for(let j= 0; j < contours.size(); j++){

        let rect = cv.boundingRect(contours.get(j))
        if ( (cv.contourArea(contours.get(j)) >= lowArea) &&
             (cv.contourArea(contours.get(j)) <= highArea) ) {
                rectArray.push(rect);
            }
            if (cv.contourArea(contours.get(j)) > 1000){
    
                cv.rectangle(showArea,new cv.Point(rect.x,rect.y),
                    new cv.Point (rect.x+rect.width,rect.y+rect.height),
                    clr.Green,2,0);
                cv.putText(showArea, "(" + ~~cv.contourArea(contours.get(j)) + ")", 
                    new cv.Point(rect.x+15,rect.y+20),
                    cv.FONT_HERSHEY_PLAIN,2,clr.Red,1,cv.LINE_AA,false);   
            };

    
    };
 
    cv.imshow("showGray",showArea);
    showArea.delete();
    // 'them' are the rectangles around a domino
    rectArray.forEach((them,cT) => {
        /**
        * @type{cv.KeyPoint}
        */
        let pips = simpleBlobDetector(wrkMat.roi(them),params);
        if (pips.length > 0){
           //console.log("pips on rectangle  " + cT +  " == " + pips.length + 
           //     " @ x,y " + them.x + ','+ them.y);
            let  kptList = [];
            pips.forEach (kPt =>{
                let tmpPt = kPt;
                //console.log('kPt point x,y ' + ~~kPt.pt.x + ',' + ~~kPt.pt.y);
                tmpPt.pt.x += them.x;
                tmpPt.pt.y += them.y;
                kptList.push(tmpPt);
               // console.log('pip x,y ' + ~~tmpPt.pt.x+ ','+  ~~tmpPt.pt.y + 
               // " size " + tmpPt.size)
            });
            kptTblVal = {rect: them,kPtArray: kptList};
            kptTbl.push(kptTblVal);
        }
    });
    contours.delete;  heirs.delete; srcGray.delete;
    if(kptTbl.length == 0 ){
        kptTbl.delete;
        return "There were no Dominos detected";   
    } 
    //console.log(kptTbl.length + " is kptTbl length") 
    let dominoStr = "";
    let totalofAllDominos = 0;
    kptTbl.forEach((cc,num) =>{
        // put in the dots on the domino
        cc.kPtArray.forEach((thing, xNum) =>{
           let r  = Math.round(thing.size*.25);
           //relative to bouding rectangle
           cv.circle(wrkMat,thing.pt,r,clr.Green,2);
        });

        //put the green box around the domino
        cv.rectangle(wrkMat,
           new cv.Point(cc.rect.x,cc.rect.y),
           new cv.Point (cc.rect.x+cc.rect.width,cc.rect.y+cc.rect.height),
           clr.Green,2,0);

        // put the domino number near the right bottom
        let domX = cc.rect.x + cc.rect.width;
        let domY = cc.rect.y + cc.rect.height;
        cv.putText(wrkMat, "(" + (num + 1).toString() + ")", 
           new cv.Point(domX,domY),
           cv.FONT_HERSHEY_SIMPLEX,0.5,clr.Blue,2,cv.LINE_AA,false);   
        dominoStr += "#(" + (num+1) + ")__" + cc.kPtArray.length +", "; 
        totalofAllDominos += cc.kPtArray.length;
    });

    dominoStr += " \n total of All Dominos ==> "+ totalofAllDominos;   
    kptTbl.delete;
    cv.imshow('showVid1',wrkMat);
    wrkMat.delete;
    return dominoStr;  //sets buildinfo to the summary totals for all dominos
}

</script>
<style>
    .build-info {
    border: 2px;
      width: 900px;
      height: 100px;
      font-size: 1em;
    }
    
  
</style>


<h1 title="camera capture"> </h1>
  
    <p class="build-info mx-30 "> {@html buildInfo.replace(/\n/g, '<br />')}   </p> 
    <div  >
        <button type="button" id="countButton"
        class="px-6 py-2.5 bg-blue-600 text-white font-medium text-md leading-tight
         uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
         focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
         active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Count Dominos
        </button>
        <label> Min Area
            <input type=range bind:value={lowArea} min=1000 max=50000 step=1000> 
            <input type=number bind:value={lowArea} min=1000 max=50000 step=1000>
             Max Area
            <input type=range bind:value={highArea} min=0 max=50000 step=1000> 
            <input type=number bind:value={highArea} min=0 max=50000 step=1000> 
        
        </label>
    </div> 
    <div class="flex flex-wrap  gap-2  ml-4 min-w-max">
        <div class="p-4 " >
            <video id="videO" > howdy  <track kind="captions"/>
            </video>
        </div>
        <div class="p-4  "  >
             <canvas  id="showVid1"  title="Big Daddy" >
             </canvas>
        </div>
        
<!--
    showGray is just for showing  a canvas when checking something out
-->

        <div class="p-4 " > 
            <canvas id="showGray" title="Gray Boy" >
            </canvas>
        </div>
       
    </div>   

    