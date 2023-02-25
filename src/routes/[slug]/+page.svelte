<script>
	/** @type {import('./$types').PageData} */
  import {roundTableData } from '../IconSvg.js'; 
	import CaptureDominos from './CaptureDominos.svelte'; 
	import SavePoints from './SavePoints.svelte';
  export let  playerIndex= 0;
  export let data;
  // putting the $: around the next line makes it reactive. SO
  // when you want to update the store you need to use the $:
  $: {console.log(' Selected player is ' + playerIndex + ' from +page.svelte bind of prop')}
</script>
  
 <h1> Camera Capture - Domino Counter </h1>

  <div class=" w-12 h-6"> <br>
    Scoring for Round ==>   {@html roundTableData[data.content].icon} <br>
    <SavePoints bind:index={playerIndex}>

    </SavePoints>
  
  </div>
  

  <CaptureDominos bind:selected={playerIndex} dominoRound={data.content}/>


  
  