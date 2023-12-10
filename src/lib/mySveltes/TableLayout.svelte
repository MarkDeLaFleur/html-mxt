<script>
    import { onMount } from 'svelte';
    import {roundTableData } from '$lib/myFunctions/IconSvg';
    import {playerScore} from '$lib/myFunctions/TableStore';
	import { to_number } from 'svelte/internal';
    $: {playerScore};
    let playerColors = ["border bg-orange-500","border bg-pink-300",
                    "border bg-purple-500","border bg-yellow-200",
                    "border bg-blue-400","border bg-red-500",
                    "border bg-green-400","border bg-yellow-700"];

    onMount(async () => $playerScore.forEach((player,ptr) =>{
        if(player.playerName== "") {
            document.getElementById("playRow"+ptr).hidden = true;
        }
    })  
    )
    </script>
    <body>
        <p class="font-semibold text-align-bottom md:text-xl ml-5">Score Summary</p>
    <div class="container w-full  ml-3">
        <table  class="table-fixed border-1 border-black " >
                <tr >
                
                    <th class="sm:w-9 border-2 border-black bg-gray-400 text-red-900"> 
                      Round      
                    </th>
                    {#each $playerScore as player,rowptr}
                    {#if player.playerName.length >1}
                    <th  class=" sm:w-9 border-2 border-black align-bottom {playerColors[rowptr]}"
                        id="{player.playerName}">
                        {player.playerName}       
                    </th>
                    {/if}
                    {/each}
                <tr/>
                {#each roundTableData as {icon},iconIndex}
                <tr class=" border-2 border-black text-left" id="round{iconIndex}">
                    <td class="border-2 border-black bg-white-100 text-sm align-text-left ">
                           {@html icon}
                    </td>
                    {#each $playerScore as player}
                    {#if player.playerName.length >1}
                    <td class="text-right w-10 md:w-9 border-black border-2 text-sm">
                            <div class="w-10" >
                            {player.pScore[iconIndex]} 
                            </div>       
                    </td>
                    {/if}
                    {/each}
                 
                </tr>
                {/each}
                <tr>
                <th class="sm:w-9 border-2 border-black bg-gray-400 text-red-900"> 
                    Total      
                </th>
                {#each $playerScore as player}
                {#if player.playerName.length >1}       
                <td class="text-right border-2 border-indigo-600 text-sm bg-lime-300 ">
                            {player.pScore.map(  elt => {
                               return  /^\d+$/.test(elt) ? parseInt(elt) : 0;  }).reduce( (a,b) => a+b,0)}
                </td>
                
                {/if}
                {/each}
                </tr>        

        </table>

    </div>  
    </body>  