<script>
import AltTableLayout from '../lib/mySveltes/AltTableLayout.svelte';
import { playerScore } from '$lib/myFunctions/TableStore';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
onMount(  () => {
  //check and see if any of the player names in the player score table are initialized
  let checkIt = false;
    $playerScore.forEach(element => {if(element.playerName.length > 0) checkIt= true})
    if (checkIt != true) {goto("/newGame")};
    });
</script>
  <AltTableLayout  />

 