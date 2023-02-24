<script>
	/** @type {import('./$types').PageData} */
  import {roundTableData } from '../IconSvg.js'; 
	import CaptureDominos from './CaptureDominos.svelte';
  import SavePoints from './SavePoints.svelte'; 
  let  playerIndex= 0;
  export let data;
  // putting the $: around the next line makes it reactive. SO
  // when you want to update the store you need to use the $:
  $: {console.log(' Selected player is ' + playerIndex + ' from +page.svelte bind of prop')}
</script>
  
 <h1> Camera Capture - Domino Counter </h1>

  <div class=" w-12 h-6"> <br>
   {@html roundTableData[data.content].icon} <br>
  </div>
  
  <SavePoints bind:playerIndex={playerIndex} />
  <CaptureDominos bind:selected={playerIndex}/>


  
  