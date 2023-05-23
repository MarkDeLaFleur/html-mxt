<script>
// @ts-nocheck
import { playerScore } from '$lib/myFunctions/TableStore';
import { goto } from '$app/navigation';
import { each } from 'svelte/internal';
export let display_func = a => a + '   ';
export function setNames(option){
  console.log('selected number of players is ' + option)
  for (let n = 0; n < option;n++){
    newPlayers.push('Player '+ (n+1));
    console.log('set names '+ option + ' and ' +n);
    document.getElementById("player"+n).hidden=false;
    document.getElementById("label"+n).hidden=false;
  }
}
let newPlayers = [];
let numPlayers = [2,3,4,5,6,7,8];
$: {newPlayers;}
function initTable(){
  for (let i=0;i<7;i++){  // 8 players
    $playerScore[i].playerName="";
    for(let j=0;j<13;j++) {// 13 rounds
      $playerScore[i].pScore[j] = "";
    }
  for (let i=0; i < newPlayers.length;i++){
    $playerScore[i].playerName = newPlayers[i]
  }  
  goto('/');
  }
}
function downloadFile() {
  let dataHeader = "Player,12,11,10,9,8,7,6,5,4,3,2,1,Blank\r\n"
  let data = "";
  $playerScore.forEach(player => {
    if (player.playerName != "") {
      data += player.playerName + "," 
      for (let j = 0; j < player.pScore.length; j++){
          data += player.pScore[j] + ",";
      } 
      data += '\r\n';
    }
  });
  if (data.length > 0){
    data = dataHeader+data;
    const fileName = 'csvFile.csv';  
    const aLink = document.createElement('a');
    aLink.href = 'data:text/csv;charset=UTF-8,' + encodeURI(data);
    aLink.target = '_blank';
    aLink.download = fileName;
    aLink.click()
    document.write(data)
  }
  else{alert ("There was no Game to Save")}
}





</script>
<meta name="viewport" content="width=device-width, initial-scale=1"  />
<h1 title="Start a New Game" > </h1>
<p class="text-lg text-center">Reset Player Score Table for a New Game </p>
<div class="ml-5 h-56 grid grid-cols-2 gap-4 content-normal w-fit ">
  <div class="border rounded bg-gray-200">
     <!-- svelte-ignore a11y-label-has-associated-control -->
      <label> Select Number of Players: <br> </label>   
      {#each numPlayers as option}
        <input type=radio on:click={() => setNames(option)} name="NumberOfPlayers" value={option} >
          {@html display_func(option + ' Players') + '<br/>'}  
      {/each}
      <br>
  </div>
  <div class="border rounded bg-gray-200">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label> Enter Player Names: <br> </label>
      {#each $playerScore  as pName,i}
      <label hidden id="label{i}" for="player{i}"> Player Name {i+1}: </label>
      <input hidden class="border bg-blue-200" id="player{i}" name="player{i}" type=text bind:value= {newPlayers[i]}><br/>
    {/each}
  </div>  
 </div>
 <br/>

<button
type="button" id="copyGametoCSV" on:click={downloadFile}
class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
         uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
           focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
         active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
Save Game to CSV File
</button>

  <button
  type="button" id="resetPlayerTable" on:click={initTable}
  class="ml-5 lg:ml-2 px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
           uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
             focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
           active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
Start New Game
</button>








 