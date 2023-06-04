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
        <p class="font-semibold text-align-bottom md:text-xl ml-5">Mexican Train Score Keeper and Pip Counter Summary Page</p>
    <div class="container w-full  ml-3">
        <table  class="table-fixed border-1 border-black " >
                <tr >
                
                    <th class="sm:w-9 border-2 border-black bg-gray-400 text-red-900"> 
                      Round      
                    </th>
                    <th class="sm:w-9  border-2 border-black bg-gray-300 text-green-900 "> 
                        Total
                    </th>
                
                    {#each roundTableData as {icon},iconIndex}
                    <th  class=" sm:w-9 border-2 border-black align-bottom"
                        id="round{iconIndex}">
                               {@html icon}
                    </th>
                    {/each}
                <tr/>
                {#each $playerScore as player,rowptr}
                <tr class=" border-2 border-black text-left" id="playRow{rowptr}">
                    <td class="border-2 border-black bg-indigo-400 text-sm align-text-left ">
                            {player.playerName}
                    </td>
                    <td class="text-right border-2 border-indigo-600 text-sm bg-lime-300 ">
                            {player.pScore.map(  elt => {
                               return  /^\d+$/.test(elt) ? parseInt(elt) : 0;  }).reduce( (a,b) => a+b,0)}
                    </td>
                    {#each player.pScore as score}
                    <td class="text-right w-10 md:w-9 border-black border-2 text-sm">
                            <div class="w-10" >
                                {score}
                            </div>
                            
                    </td>
                    {/each}
                </tr>
                {/each}	

        </table>

    </div>  
    </body>  