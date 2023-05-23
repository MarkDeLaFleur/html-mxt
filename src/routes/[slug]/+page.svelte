<script>
	/** @type {import('./$types').PageData} */
  import {roundTableData } from '$lib/myFunctions/IconSvg' 
	import CaptureDominos from './CaptureDominos.svelte'; 
	import SavePoints from './SavePoints.svelte';
  export let  playerIndex = 0;
    /**
	 * @type {{ content: number; }}
	 */
   export let data; 
  // data.content gives us our index for the Round being scored ( domino Icon)
  // putting the $: around the next line makes it reactive. Comment out after testing. 
  // then we bind that data (content from the use of slug in the main +page.svelte) to the Capture Dominos.svelte
  $: {console.log(' Selected player is ' + playerIndex + ' from +page.svelte bind of prop');
    }
  		
</script>

<meta name="viewport" content="width=device-width, initial-scale=1"  />
<h1 title="camera capture" > </h1>
<div class="block w-1/2 text-left  px-2 py-2 ">
  Scoring for Round {12-data.content}
  <div class="block w-1/4 px-2 h-5">
    {@html roundTableData[data.content].icon} 
  </div>
</div>
<SavePoints bind:selected={playerIndex} />
<CaptureDominos bind:selected={playerIndex}   dominoRound={data.content} />

   
  
  