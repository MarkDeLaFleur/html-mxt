<script lang ts>
  import { playerScore } from '$lib/myFunctions/TableStore';
  export let options = [];
  export let display_func = a => a + '   ';
  export let selected = 0;
  for (let x = 0; x< $playerScore.length;x++){
      if( $playerScore[x].playerName.length > 1){
        options.push({"player": $playerScore[x].playerName})
      }
  }
</script>
<div class="block w-full px-2 ">

  <br><br>
  <label> Choose which player to apply points to: <br>   
  {#each options as option, i}

      <input type=radio bind:group={selected} name="playerIndex" value={i} >
        {display_func(option.player)} 
    
  {/each}
  <br><br>
  </label>
</div>
 