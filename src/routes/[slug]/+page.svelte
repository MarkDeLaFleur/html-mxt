<script>
	/** @type {import('./$types').PageData} */
  import {roundTableData } from '../IconSvg.js'; 
  import SavePoints from './SavePoints.svelte'; 

  export let data;
  let selected;
    console.log('data content ' + data.content)

</script>
  
 <h1> Camera Capture - Domino Counter </h1>

  <div class=" w-12 h-6"> <br>
   {@html roundTableData[data.content].icon} <br>
  </div>
  
  <SavePoints bind:value={selected} />

  
  