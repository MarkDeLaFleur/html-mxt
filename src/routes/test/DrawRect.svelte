<svelte:options accessors={true} />
<script >
import {onMount } from "svelte";
let context;
let canvasEle;
onMount(async () =>{
    canvasEle = document.getElementById('showVid1');
    context = canvasEle.getContext('2d')});
let isDrawStart = false;
export let startPosition = {row: 0, col: 0};
export let endPosition = {row: 0, col: 0};

let getClientOffset = (event) => {
    const {pageX, pageY} = event.touches ? event.touches[0] : event;
    const col = pageX - canvasEle.offsetLeft;
    const row = pageY - canvasEle.offsetTop;

    return {
       row,
       col
    } 
}

let drawRectangle = (width, height) => {

  context.beginPath();
  context.strokeStyle = "brown"; // add blue color to the border
  context.lineWidth = 4; // increase the border width
  context.fillStyle = "orange"; // add background color to shape
  context.strokeRect(startPosition.col, startPosition.row, width, height); 
  // configure rectangle coordinates, width and height
  context.stroke(); // drawing of bordered rectangle
  context.fill(); // drawing of background in rectangle
}

const clearCanvas = ()  => {

   context.clearRect(0, 0, canvasEle.width, canvasEle.height);
}

const mouseDownListener = (event) => {
   startPosition = getClientOffset(event);
   isDrawStart = true;
}

const mouseMoveListener = (event) => {

  if(!isDrawStart) return;
  
  endPosition = getClientOffset(event);
  const width = endPosition.col - startPosition.col;
  const height = endPosition.row - startPosition.row;
  drawRectangle(width, height);
}

const mouseupListener = () => {
  isDrawStart = false;
}

</script>
<div class="p-4 flex w-full h-1/2 mb-4"
	> <canvas id="showVid1"  class="ml-5 lg:ml-10 w-full border cursor-crosshair "
     title="Big Daddy  {startPosition.row} / {startPosition.col} by {endPosition.row} / {endPosition.col}" 

    on:touchend="{mouseMoveListener}"
    on:touchmove="{mouseMoveListener}"
    on:touchstart="{mouseDownListener}"
    on:mouseup="{mouseupListener}"
    on:mousemove="{mouseMoveListener}"
    on:mousedown="{mouseDownListener}">
</canvas>
</div>

