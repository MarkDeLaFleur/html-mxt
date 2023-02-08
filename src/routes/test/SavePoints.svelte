<script lang ts>
   	import { playerScore } from '../TableStore';
    export let options = [];
    export let display_func = a => a;
    export let index = 0;
    export let value;
	$playerScore.forEach( item => 
		{ 
            if (item.playerName.length > 1)  options.push({"player": item.playerName})}) ;

    $: {
      value = options[index].player;

    }
  </script>
  
  <select bind:value={index}>
    {#each options as option, i}
      <option value={i}>
         {display_func(option.player)}
      </option>
    {/each}
  </select>
  