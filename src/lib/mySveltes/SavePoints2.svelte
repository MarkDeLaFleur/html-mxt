<script lang ts>
  import { playerScore } from '$lib/myFunctions/TableStore';
  import {roundTableData } from '$lib/myFunctions/IconSvg'
  export let options = [];
  export let display_func = a => a + '   ';
  export let selected = 0;
  let score = 0;
  for (let x = 0; x< $playerScore.length;x++){
      if( $playerScore[x].playerName.length > 1){
        options.push({"playerName": $playerScore[x].playerName})
      }
  }
  let buttonSelection = 'no button clicked yet!';
  let roundSelected = 0;
  $:{buttonSelection;
     if (document.getElementById("score") != null){
        console.log('pScore is ' + $playerScore[selected].pScore[roundSelected] );
        document.getElementById("score").value = $playerScore[selected].pScore[roundSelected];
        console.log('selected ' + selected); 
        console.log('options playername ' + options[selected].playerName);
        console.log($playerScore[selected].playerName);
        console.log('round Selected ' + roundSelected);   ;
     
        
  
     }

    
  }
  export function roundIcons(x){
    let domino = ['twelve','eleven','ten','nine','eight','seven',
    'six','five','four','tre','duo','uno','blank'];
   buttonSelection = "button " + domino[x] + ' clicked';
   roundSelected = x;
  }
  export function saveScore(){
    console.log('Save clicked and score was ' + score + ' and domino was ' + buttonSelection +
    ' and player ' + options[selected].playerName + 'is getting the points!');
    $playerScore[selected].pScore[roundSelected] = score;

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
  <div class="w-24 ml-2">
    You chose  {@html roundTableData[roundSelected].icon}
  
  </div>
  </div>
  <label class="ml-2"> Choose which player to apply points to: <br>   
 
  {#each options as option, i}

      <input class="ml-2" type=radio bind:group={selected} name="playerIndex" value={i} >
        {display_func(option.playerName)} <br/>
    
  {/each}
  <br><br>
  </label>
  <label class="ml-2"> Enter Points Here:
    <input class="w-16 bg-indigo-400 px-2 " type=number bind:value={score} id='score'> 
    <button  on:click="{() => saveScore()}" class="w-12 bg-yellow-100 px-1">
      SAVE
  
    </button>
</body>

 