<script lang ts>
   	import { playerScore } from '../TableStore';
    export let options = [];
    export let display_func = a => a + "  ";
    export let index = 0;
    export let playerIndex;
    for (let x = 0; x< $playerScore.length;x++){
      if( $playerScore[x].playerName.length > 1){
        options.push({"player": $playerScore[x].playerName})
      }
    }
	  $: { playerIndex = options[index].player; console.log(playerIndex + ' from SavePoints ')   }
  
  </script>



  <br><br>

  {#each options as option, i}
    <label> 
      <input type=radio bind:group={index} name="playerIndex" value={i} >
       {display_func(option.player)} 
    </label>  
  {/each}
 
   <p> You will be updating player {index} ( {playerIndex} ) when clicking the Save Points button</p>
 