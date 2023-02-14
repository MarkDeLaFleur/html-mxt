<script lang ts>
   	import { playerScore } from '../TableStore';
    export let options = [];
    export let display_func = a => a;
    export let index = 0;
    export let value;
	$playerScore.forEach( item => 		{
    if ( item.playerName != "" || item.playerName != " "){  options.push({"player": item.playerName})}
    }) ;
  console.log('options'+ options.length)
  $: { value = options[index].player;    }
  </script>


  <select bind:value={index}>
    {#each options as option, i}
      <option value={i}>
         {display_func(option.player) + "  " }
      </option>
    {/each}
  </select>
  <br><br>

  {#each options as option, i}
  <label> {display_func(option.player)}

    <input type=checkbox bind:group={options} name="playerGroup" value={i}>
  </label>     

  {/each}
  