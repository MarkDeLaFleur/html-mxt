<script>
    import { onMount } from 'svelte';
    import {roundTableData } from '$lib/myFunctions/IconSvg';
    import {playerScore} from '$lib/myFunctions/TableStore';
	import { to_number } from 'svelte/internal';
    $: {playerScore};
    onMount(async () => $playerScore.forEach((player,ptr) =>{
        if(player.playerName== "") {
            document.getElementById("playRow"+ptr).hidden = true;
        }
    })  
    )
    </script>
    <body>
        <p class="font-semibold text-align text-xl ml-5">Mexican Train Score Keeper and Pip Counter Summary Page</p>
    <div class="container w-full">
        <table  class="table-fixed border-1 border-black ml-5 mx-auto " >
	
            <thead class="sticky top-1 border-black ">
                    <tr >
                        <th class="border-2 border-black text-red-900 align-bottom"> 
                            Round      
                        </th>
                        <th class="border-2 border-black text-green-900 align-bottom"> 
                            Total      
                        </th>
                     
                        {#each roundTableData as {icon},iconIndex}
                        <th  class="border-2 border-black align-bottom" 
                         id="round{iconIndex}"
                        >
                         
                            {@html icon}
                      
                        </th>
                        {/each}
                    <tr/>
            </thead>
    
            <tbody >
                {#each $playerScore as player,rowptr}
                 <tr class=" border-2 border-black  text-left bg-white" id="playRow{rowptr}">
                        <td class="border-2 border-indigo-700 align-baseline">
                            {player.playerName}
                        </td>
                        <td class="border-2 border-indigo-600 align-baseline text-right bg-lime-300 ">
                            {player.pScore.map(  elt => {
                               return  /^\d+$/.test(elt) ? parseInt(elt) : 0;  }).reduce( (a,b) => a+b,0)}
                        </td>
                        {#each player.pScore as score}
                        <td class="w-10 border-black border-2 text-right">
                            {score}
                        </td>
                       
                        {/each}
                
                 </tr>
                 {/each}	
             </tbody>
    
    </div>  
    </body>  