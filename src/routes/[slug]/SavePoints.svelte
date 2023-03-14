<script lang ts>
   	import { playerScore } from '$lib/myFunctions/TableStore';
    export let options = [];
    export let display_func = a => a + "  ";
    export let index = 0;
    //export let playerIndex;
    for (let x = 0; x< $playerScore.length;x++){
      if( $playerScore[x].playerName.length > 1){
        options.push({"player": $playerScore[x].playerName})
      }
    }
	  $: { index; console.log(index + ' from SavePoints ')   }
  
  </script>
  <br><br>
  {#each options as option, i}
    <label> 
      <input type=radio bind:group={index} name="playerIndex" value={i} >
       {display_func(option.player)} 
    </label>  
  {/each}
 
  
 