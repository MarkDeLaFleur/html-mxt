<script>
	/** @type {import('./$types').PageData} */
 
import CaptureDominos from '../../lib/mySveltes/CaptureDominos.svelte';
import SavePoints2 from '../../lib/mySveltes/SavePoints2.svelte';
export let roundSelected = 0;
export let selected = 0;

    /**
	 * @type {{ content: number; }}
	 */
  		
</script>

<meta name="viewport" content="width=device-width, initial-scale=1"  />
<h1 title="Domino Scoring" > </h1>
<SavePoints2 bind:roundSelected bind:selected />
<CaptureDominos bind:roundSelected  bind:selected/>


   
  
  