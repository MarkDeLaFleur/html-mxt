<script>
// @ts-nocheck

  
import TableLayout from '../TableLayout.svelte';
import { playerScore } from '$lib/myFunctions/TableStore';
	import { goto } from '$app/navigation';

function initTable(){
  for (let i=0;i<7;i++){  // 8 players
    $playerScore[i].playerName="";
    for(let j=0;j<12;j++) {// 13 rounds
      $playerScore[i].pScore[j] = "";
      let tblscore = document.getElementById('score'+j+i);
      tblscore.textContent = "";
      tblscore=tblscore  //make it reactive
    }
    goto('/');
  }
  
  

}



</script>

<h1>
    <p class="text-lg text-center">Reset Player Score Table for a New Game </p>
 </h1>
 <TableLayout/>
  <button
  type="button" id="resetPlayerTable" on:click={initTable}
  class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
           uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
             focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
           active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
Start New Game
</button>







 