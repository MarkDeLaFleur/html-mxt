<script>
// @ts-nocheck
import { playerScore } from '$lib/myFunctions/TableStore';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
export let display_func = a => a + '   ';
let numPlayers = [2,3,4,5,6,7,8];
let options = 0;
let mounted = false;
onMount( () => {console.log("mounted good");mounted=true;});
$:{  if (mounted) {
  unHidePlayers();
  console.log('After the options = ' + options);
}
}
  
function unHidePlayers (){
  if (options == 0){  // you got here without selecting the players count
    $playerScore.forEach((player,index) => {
      if (player.playerName.length > 1){ 
        document.getElementById("player"+index).hidden=false;
        document.getElementById("label"+index).hidden=false; 
        options++;
      }
     });
  }
  else {
    $playerScore.forEach((player,index) => {
      if (player.playerName.length > 1 &&
          index < options){ //open it up for another entry
        document.getElementById("player"+index).hidden=false;
        document.getElementById("label"+index).hidden=false; 
      }
      if (index+1 > options){ //hide it and blank the player Name
        document.getElementById("player"+index).hidden=true;
        document.getElementById("label"+index).hidden=true;
        $playerScore[index].playerName = ""; 
      }
     });

    for (let i=0; i < options;i++){
      document.getElementById("player"+i).hidden=false;
      document.getElementById("label"+i).hidden=false; 
    }
  }
}
  

  

function initTable(){
  $playerScore.forEach((player,i) => {
    $playerScore[i].playerName= "";
    player.pScore.forEach((score,j) => {
          $playerScore[i].pScore[j] = " ";
    });
  });
  options=0;
  goto('/');
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
      {#each numPlayers as option,i}
        <input type=radio bind:group={options} 
          name="NumberOfPlayers" value={option}  >
          {@html display_func(option + ' Players') + '<br/>'}  
      {/each}
      <br>
  </div>
  <div class="border rounded bg-gray-200">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label> Enter Player Names: <br> </label>
      {#each $playerScore  as pName,i}
      <label hidden id="label{i}" for="player{i}"> Player Name {i+1}: </label>
      <input hidden class="border bg-blue-200" id="player{i}" name="player{i}" type=text
              bind:value= {$playerScore[i].playerName}><br/>
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








 