<svelte:options accessors={true} />
<script >
import {onMount } from "svelte";
export let canvasId = "";
export let canvasWidth = 0;
export let canvasHeight = 0;
let canvasEle;
let context;
onMount(async () =>{
    canvasEle = document.getElementById(canvasId);
    //context = canvasEle.getContext('2d')
   
});

</script>
<div class="title"> <label> camera field width 
    <input type=range id='camerawidth' min=100 max=800 bind:value={canvasWidth} 
    on:change={ (e) => canvasWidth = e.target.value} >
</label>
    <label> camera field height
    <input type=range id='cameraheight' min=100 max=600 bind:value={canvasHeight} 
    on:change={ (e) => canvasHeight = e.target.value} >
</label>

</div>
<div >

<canvas id={canvasId}  class="ml-5 lg:ml-10 border " width={canvasWidth} height={canvasHeight}
     title="Big Daddy {canvasWidth} by {canvasHeight} " >
</canvas>
</div>


