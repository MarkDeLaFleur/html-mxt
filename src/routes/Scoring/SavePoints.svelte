<script lang ts>
  import { playerScore } from '$lib/myFunctions/TableStore';
  import {roundTableData } from '$lib/myFunctions/IconSvg'
  export let options = [];
  export let display_func = a => a + '   ';
  export let selected = 0;
  let score = 0;
  for (let x = 0; x< $playerScore.length;x++){
      if( $playerScore[x].playerName.length > 1){
        options.push({"player": $playerScore[x].playerName})
      }
  }
  let snicky = 'no button clicked yet!';
  let roundSelected = 0;
  $:{snicky;score;}
  export function tooly(x){
    let domino = ['twelve','eleven','ten','nine','eight','seven',
    'six','five','four','tre','duo','uno','blank'];
   snicky = "button " + domino[x] + ' clicked';
   roundSelected = x;
  }
  export function saveScore(){
    console.log('Save clicked and score was ' + score + ' and domino was ' + snicky +
    ' and player ' + options[selected].player + 'is getting the points!')
  }
</script>
<body>
  <div class="container w-full ml-2">
    <label> Click on the Domino Icon to Score that Round <br/>

    {#each roundTableData as  icon,nummy}
      <button  on:click="{() => tooly(nummy)}" class="w-12 px-1">
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
        {display_func(option.player)} <br/>
    
  {/each}
  <br><br>
  </label>
  <label class="ml-2"> Enter Points Here:
    <input class="w-16 bg-indigo-400 px-2 " type=number bind:value={score} > 
    <button  on:click="{() => saveScore()}" class="w-12 bg-yellow-100 px-1">
      SAVE
  
    </button>
</body>

 