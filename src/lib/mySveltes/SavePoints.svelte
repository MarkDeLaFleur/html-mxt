<script lang ts>
  import { playerScore } from '$lib/myFunctions/TableStore';
  import {roundTableData } from '$lib/myFunctions/IconSvg'
  export let options = [];
  export let display_func = a =>  a + '  ';
  export let selected = 0;
  let buttonSelection = 'no button clicked yet!';
  export let roundSelected = 0;
 
  let score = 0;
  for (let x = 0; x< $playerScore.length;x++){
      if( $playerScore[x].playerName.length > 1){
        options.push({"playerName": $playerScore[x].playerName,"playerNumber":x});
      }
  }
  $:{buttonSelection;
     if (document.getElementById("score") != null){
         const v = parseInt($playerScore[options[selected].playerNumber].pScore[roundSelected]);
        console.log('pScore is ' + (isNaN(v) ? 0 : v ) );
        document.getElementById("score").value = (isNaN(v) ? 0 : v);
        console.log(`selected player ${selected} ` +
         `options playername ${options[selected].playerName} ` +
         `real player number ${options[selected].playerNumber} ` +
         `round Selected ${roundSelected} ` ); 
  
     };    
  }
  export function roundIcons(x){
    let domino = ['twelve','eleven','ten','nine','eight','seven',
    'six','five','four','tre','duo','uno','blank'];
   buttonSelection = "button " + domino[x] + ' clicked';
   roundSelected = x;
  }
  export function saveScore(){
    console.log(`Save clicked and score was ${score} and domino was ` +
    `${buttonSelection} and player ${options[selected].playerName}(${options[selected].playerNumber}) ` +
    `is getting the points!`);
    $playerScore[options[selected].playerNumber].pScore[roundSelected] = score;

  }
</script>
<body>
  <div class="container w-full ml-2">
    <label> Click on the Domino Icon to Score that Round <br/>

    {#each roundTableData as  icon,ptr}
      <button  on:click="{() => roundIcons(ptr)}" class="w-12 px-1">
      {@html icon.icon}
    </button>
  {/each}
  </label>
  <br><br>
  <div class="container w-32 ml-2 flex justify-left">
    You chose  {@html roundTableData[roundSelected].icon}
  
  </div>
  </div>
  <br>
  <label class="ml-2 w-45">Choose which player <br> &nbsp; to apply points to:   
  <div class="flex justify-left">
      {#each options as option, i}
       <input class="ml-2" type=radio bind:group={selected} name="playerIndex" value={i} ><br>
        &nbsp;{display_func(option.playerName)}&nbsp;&nbsp;&nbsp;<br/>
     {/each}
  </div>
  </label>

  <label class="ml-2"> Enter Points Here:
    <input class="w-16 bg-indigo-400 px-2 " type=number bind:value={score} id='score'> 
    <button  on:click="{() => saveScore()}" class="px-4 py-2 bg-blue-600 text-white font-medium text-md leading-tight
       			uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
			  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
   			 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">

      SAVE
  
    </button>
</body>

 