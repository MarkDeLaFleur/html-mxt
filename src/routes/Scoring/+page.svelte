<script>
	/** @type {import('./$types').PageData} */
 
import CaptureDominos from '../../lib/mySveltes/CaptureDominos.svelte';
import SavePoints from '../../lib/mySveltes/SavePoints.svelte';
export let roundSelected = 0;
export let selected = 0;
export let options = [];
export let score = 0;
    /**
	 * @type {{ content: number; }}
	 */
  		
</script>

<meta name="viewport" content="width=device-width, initial-scale=1"  />
<h1 title="Domino Scoring" > </h1>
<SavePoints bind:roundSelected bind:selected bind:options bind:score />
<CaptureDominos bind:roundSelected  bind:selected bind:options bind:score/>


   
  
  