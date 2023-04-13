<svelte:options accessors={true} />
<script >
import {onMount } from "svelte";
export let canvasId;
export let canvasWidth;
export let canvasHeight;
let camRes = 1;
$: if(camRes == 1){canvasHeight = 480;canvasWidth = 640};
$: if(camRes == 2) {canvasHeight = 720; canvasWidth = 1080};
$: if(camRes == 3) {canvasHeight = 1080; canvasWidth = 1920};
export let FPS;
let canvasEle;
let videoEle;
let context;
onMount(async () =>{
    canvasEle = document.getElementById(canvasId);
    //context = canvasEle.getContext('2d')
   
});

</script>
<div class="title"> <h2> Video Resolution</h2>

    <input type=radio id='cameraRes' name=' 480p ' bind:group={camRes} value={1}> 480p
 <!-->   <input type=radio id='cameraRes' name=' 720p ' bind:group={camRes} value={2}> 720p
    <input type=radio id='cameraRes' name=' 1080p' bind:group={camRes} value={3}> 1080p
 -->   
    
    


</div>
<div >

<canvas id={canvasId}  class="ml-5 lg:ml-10 border " width={canvasWidth} height={canvasHeight}
     title="Big Daddy {canvasWidth} by {canvasHeight} FPS {FPS} " >
</canvas>
</div>


