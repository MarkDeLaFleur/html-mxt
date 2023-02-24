<svelte:options accessors={true} />
<script >
import {onMount } from "svelte";
export let canvasId = "theCanvas";  //sent as prop from page.svelte
export let width = 0;
export let height = 0;
export let startPosition = {row: 0, col: 0};
let endPosition = {row: 0, col: 0};
let context;
let canvasEle;
let isDrawStart = false;
onMount(async () =>{
    canvasEle = document.getElementById(canvasId);
    context = canvasEle.getContext('2d')}
    );


let getClientOffset = (event) => {

   // const {pageX, pageY} = event.touches ? event.touches[0] : event;
   const {clientX,clientY} = event.touches ? event.touches[0] : event;
   // const row = pageY  - canvasEle.offsetTop;
   const row = clientY ;
   // const col = pageX  - canvasEle.offsetLeft;
   const col = clientX ;
   return {
       row,
       col
    } 
}

let drawRectangle = (width, height) => {

  context.beginPath();
  context.strokeStyle = "brown"; // add blue color to the border
  context.lineWidth = 3; // increase the border width
  context.fillStyle = "orange"; // add background color to shape
  context.strokeRect(startPosition.col, startPosition.row, width, height); 
  // configure rectangle coordinates, width and height
  context.stroke(); // drawing of bordered rectangle
  context.fill(); // drawing of background in rectangle
}

const mouseDownListener = (event) => {
   startPosition = getClientOffset(event);
   isDrawStart = true;
}

const mouseMoveListener = (event) => {
  if(!isDrawStart) return;
  
  endPosition = getClientOffset(event);
  width = endPosition.col - startPosition.col;
  height = endPosition.row - startPosition.row;
  drawRectangle(width, height);
}

const mouseupListener = (event) => {
  
  isDrawStart = false;

}

</script>
<div class="p-4 flex w-full h-1/2 mb-4"
	> <canvas id="{canvasId}"  class="ml-5 lg:ml-10 w-full border cursor-crosshair " width=800
     title="Big Daddy  {startPosition.col} / {startPosition.row} by {endPosition.col} / {endPosition.row}" 

    on:touchend="{mouseupListener}"    on:touchmove="{mouseMoveListener}"
    on:touchstart="{mouseDownListener}"
    on:mouseup="{mouseupListener}"
    on:mousemove="{mouseMoveListener}"
    on:mousedown="{mouseDownListener}" >
</canvas>
</div>

