<script>
import Svgmxt from '$lib/svelteIcons/mxt.svelte'
import { playerNameTable } from './TableStore'
import Table from './Table.svelte';	

let redStyle = "redTable";
// @ts-ignore


import {onMount} from "svelte"
onMount(async () =>{

    // example of updating the playerNameTable
    playerNameTable.update(v =>{
        v[0].playerName1 = "Honey"
        v[0].playerName2 = "Louis"
        v[0].playerName3 = "Lenny"
        v[0].playerName4 = "Tommy"
        v[0].playerName5 = "Seth"
        v[0].playerName6 = "Nancy"
        v[0].playerName7 = "Carl"
        v[0].playerName8 = "Charlie"

        return v;
    });
});

 
 
</script>
<body>
   <picture>
      <!--	<source srcset={mxt} type="image/svg_element"/> -->
          <Svgmxt  class="w-48" />
      </picture>
  
  <h1 class="text-3xl text-blue-400 underline">Mexican Train Domino Counter and Score Keeper</h1>
  <Table playerNameTable={$playerNameTable} style={redStyle}/>
  
  
</body>  