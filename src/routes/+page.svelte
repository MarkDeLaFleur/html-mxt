<script>
import TableLayout from '../lib/mySveltes/TableLayout.svelte';
import { playerScore } from '$lib/myFunctions/TableStore';
import { goto } from '$app/navigation';
import {base} from '$app/paths';
import { onMount } from 'svelte';
onMount(  () => {
  //check and see if any of the player names in the player score table are initialized
  let checkIt = false;
  console.log(`what is base ? ${base}`);
    $playerScore.forEach(element => {if(element.playerName.length > 0) checkIt= true})
    if (checkIt != true) {goto(`${base}/newGame`)};
    }
    );
</script>
  <TableLayout  />

 