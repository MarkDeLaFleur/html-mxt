<script Lang=ts>
    // @ts-nocheck
import cv from "@techstark/opencv-js"
//import utils from "@opencv.js/utils"
import simpleBlobDetector from "@markdelafleur/simpleblobdetector"


let buildInfo = "loading..."
//let imageCapture;



const FPS = 15;
let clr = {};
    /**
	 * @type {HTMLVideoElement}
	 */

let videO;
let time0 = setTimeout((loadOpencv), 1000);
let imageCapture;
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
            document.getElementById('stopButton')
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
    videO = document.getElementById('videO');
    const stream = await navigator.mediaDevices.getUserMedia(
            {video: { width: {ideal: 640},
                      height: {ideal: 480}, 
                      facingMode: {ideal: "environment"},} 
            }).then((stream) => {
                document.getElementById('videO').srcObject = stream;
                const track = stream.getVideoTracks()[0];
                imageCapture = new ImageCapture(track);
                console.log('track label '+ track.label)
                console.log('width '+ track.getSettings().width)
                console.log('height '+ track.getSettings().height)
                document.getElementById('videO').width = track.getSettings().width;
                document.getElementById('videO').height = track.getSettings().height;
                document.getElementById('showVid1').width = track.getSettings().width;
                document.getElementById('showVid1').height = track.getSettings().height;
                document.getElementById('showGray').width = track.getSettings().width;
                document.getElementById('showGray').height = track.getSettings().height;
                
                console.log("videO width " + document.getElementById('videO').width);
    
                if(document.querySelector('videO').paused) {
                    document.querySelector('videO').play();}
           }
            ).catch((err) => {
                console.log("Video streaming error -- something went wrong "+ err);
            });
}
function grabIt(){
    imageCapture.grabFrame()
    .then( imageBitmap =>{
        
        let canvas = document.getElementById('showVid1');
        
        console.log('grab it canvas width ' + canvas.width +
        'imagebitmap width ' + imageBitmap.width)  
        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height)   
        canvas.getContext('2d').drawImage(imageBitmap,0,0);
        let srcIn = cv.imread(canvas);
        let srcResize = new cv.Mat();
        cv.resize(srcIn,srcResize,new cv.Size(640,480),0,0,cv.INTER_AREA);
        cv.cvtColor(srcIn,srcResize,cv.COLOR_BGRA2RGB,0);
        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
        cv.imshow('showVid1',findRects(srcResize));
        srcIn.delete;srcResize.delete;
    
    })
    .catch(error => console.log('grabit error '+ error));
}


function findRects(wrkMat){
    let srcGray = new cv.Mat(wrkMat.cols,wrkMat.rows,cv.CV_8UC1);
    let contours = new cv.MatVector();
    let params = {faster: true, filterByInertia: false, filterByCircularity: true,
        minThreshold: 165,  maxThreshold:250, filterByColor: false };
    let heirs = new cv.Mat();
    let kptTblVal;
    let kptTbl = [];
    let keyPts = simpleBlobDetector(wrkMat,params);
    cv.cvtColor(wrkMat,srcGray,cv.COLOR_RGB2GRAY,0);
    cv.threshold(srcGray,srcGray,165,250,cv.THRESH_BINARY);
    //cv.Canny(srcGray,srcGray,100,250,5,false);
    cv.imshow('showGray',srcGray);
    cv.findContours(srcGray,contours,heirs,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE);
    
    for (let j = 0; j < contours.size();j++){

        //  go through the contours and build a table of keypoints
        let kptList = [];
        keyPts.forEach((kPt) => {
            if (cv.pointPolygonTest(contours.get(j),kPt.pt,true) > 0  ){
                    kptList.push(kPt);
            }    
        });
        if (kptList.length > 0){                     //total keypoints in a given rectangle
            let rect = cv.boundingRect(contours.get(j));
            kptTblVal = {rect: rect,kPtArray: kptList};
            kptTbl.push(kptTblVal);
        }
        
    }
    
    // keypoints without any contours, no dominos....
    contours = null;  heirs=null; srcGray.delete;
    if(kptTbl.length == 0 ){
        buildInfo = "There were no Dominos detected";   
        kptTbl.delete;
        return wrkMat;
    } 
    console.log(kptTbl.length + " is kptTbl length") 
    let dominoStr = "";
    let totalofAllDominos = 0;
    // still need to work out the javascript sort of the kpyTbl (rect.x rect.y)
    // we have all the x.y points and I;ve done this before
   // kptTbl.sort((rect) => rect.x - rect.x)


    kptTbl.forEach((cc,num) =>{
        let consoleTemp1 = "";
        let consoleTemp2 = " area(dot num) ";
        // put in the dots on the domino
        cc.kPtArray.forEach((thing, xNum) =>{
           let r  = Math.round(thing.size*0.30);
           cv.circle(wrkMat,thing.pt,r,clr.Yellow,-1);
           consoleTemp2 += thing.size + "(" + (xNum+1) + ") ";
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

           // write on the ui the domino point totals for each one    
        dominoStr += "#(" + (num+1) + ")__" + cc.kPtArray.length +", "; 
        totalofAllDominos += cc.kPtArray.length
        
        //write to console the area of the rectangle the 
        // x,y location of the rectangle and the area of the points
        consoleTemp1 = 'domino ' + (num+1) + ' '+ cc.rect.x + "(x) "+ cc.rect.y + "(y) " +
                cc.rect.width + "(w) "+ cc.rect.height + "(h) "+
                cc.rect.width*cc.rect.height + "(w*h) " + consoleTemp2;
        console.log(consoleTemp1);
    });

    buildInfo = dominoStr + " \n total of All Dominos ==> "+ totalofAllDominos;   
    kptTbl.delete;
    return wrkMat;

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
  
    <p class="build-info mx-20 "> {@html buildInfo.replace(/\n/g, '<br />')}   </p> 
    <div  >
        <button type="button" id="stopButton"
        class="px-6 py-2.5 bg-blue-600 text-white font-medium text-md leading-tight
         uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
         focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
         active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Count Dominos
        </button>
    </div> 
    <div class="flex flex-wrap  gap-2  bg-blue-500 bg-clip-content">
        <div class="p-4 " >
            <video id="videO" > howdy  <track kind="captions"/>
            </video>
        </div>
        <div class="p-4  "  >
             <canvas  id="showVid1"  title="Big Daddy" >
             </canvas>
        </div>
        
        <div class="p-4 " >
            <canvas id="showGray" title="Gray Boy" >
            </canvas>
        </div>
       
    </div>   

    