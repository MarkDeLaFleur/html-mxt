<script>
    import { onMount } from 'svelte';
    import Footer from '../Footer.svelte';
    import {roundTableData } from '$lib/myFunctions/IconSvg';
    import {playerScore} from '$lib/myFunctions/TableStore';
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
                        <th class="border-2 border-black text-red-900"> 
                            Round      
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
                        <td class="border">
                            {player.playerName}
                        </td>
                        {#each player.pScore as score}
                        <td class="w-10 border-black border-2">
                            {score}
                        </td>
                       
                        {/each}
                
                 </tr>
                 {/each}	
             </tbody>
     
    
    </div>  
    </body>  