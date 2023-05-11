<script>
// @ts-nocheck
import { playerScore } from '$lib/myFunctions/TableStore';
import { goto } from '$app/navigation';
import { each } from 'svelte/internal';
export let display_func = a => a + '   ';
let newPlayers = [];
let numPlayers = [2,3,4,5,6,7,8];
let selected;
$: {selected}
export function setNames(){
  newPlayers = [];
 for (let n = 0; n < selected;n++){
  newPlayers.push('Player '+ (n+1));
  console.log('set names '+ selected + ' and ' +n);
 }
 console.log('newplayers length ' + newPlayers.length);
}
function initTable(){
  for (let i=0;i<7;i++){  // 8 players
    $playerScore[i].playerName="";
    for(let j=0;j<12;j++) {// 13 rounds
      $playerScore[i].pScore[j] = "";
    }
  for (let i=0; i< selected;i++){
    $playerScore[i].playerName=newPlayers[i]
  }  
    goto('/');
  }
  
  

}



</script>
<meta name="viewport" content="width=device-width, initial-scale=1"  />
<h1 title="Start a New Game" > </h1>
<p class="text-lg text-center">Reset Player Score Table for a New Game </p>
 
<div class="block w-3/4 text-left  px-2 py-2 ">
  <label> Select Number of Players:    
    {#each numPlayers as option, i}
  
        <input type=radio bind:group={selected}  on:click={setNames} name="NumberOfPlayers" value={option} >
          {display_func(option + ' Players')}  
      
    {/each}
    <br>
  </label>
  {#each newPlayers  as x,i}
<div class="flex-auto w-full border "> 

  <input bind:value= {newPlayers[i]}>
  
</div>
{/each}
</div>


<h1>
 </h1>
  <button
  type="button" id="resetPlayerTable" on:click={initTable}
  class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
           uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
             focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
           active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
Start New Game
</button>







 