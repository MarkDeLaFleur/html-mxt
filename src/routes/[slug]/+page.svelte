<script>
	/** @type {import('./$types').PageData} */
  import {roundTableData } from '../IconSvg.js'; 
  import SavePoints from './SavePoints.svelte'; 

  export let data;
  let selected;
    console.log('data content ' + data.content)

</script>
  
  <h1>Domino Camera Capture for Domino </h1>
  <div>{@html roundTableData[data.content].icon}
  </div>
  <div class="px-6">
    <li>           Player  {JSON.stringify(selected, null, 1)} Selected</li>
  <SavePoints  bind:value={selected}   />
	<li>

	
    </li>
  </div>
	