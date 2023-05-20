<script>
import { onMount } from 'svelte';
import Footer from './Footer.svelte';
import {roundTableData } from '$lib/myFunctions/IconSvg';
import {playerScore} from '$lib/myFunctions/TableStore';
$: {playerScore};
onMount(async () => $playerScore.forEach((player,ptr) =>{
	if(player.playerName== "") {
		document.getElementById("name"+ptr).hidden = true;
	    player.pScore.forEach((score,ptr1 ) => {
			document.getElementById("score"+ptr1+ptr).hidden = true;
		})
	}})


)
</script>
<body>
	<p class="font-semibold text-center text-xl  w-full">Mexican Train Score Keeper and Pip Counter</p>
<div class="container ">

  <table  class=" table-fixed w-full border-2 border-black ml-5 mx-auto" >
	
		<thead class="sticky top-0 border-black text-red-900  w-5">
				<tr >
					<th class="border-2 border-black text-red-900  flex-none w-11 h-8"> 
						#       
					</th>
					{#each $playerScore as players,playerIndex}
					<th  class="border-2 border-black empty:before:content-[attr(placeHolder)]" 
					contenteditable="true" placeHolder="Player Name Here" id="name{playerIndex}"
					bind:innerHTML={$playerScore[playerIndex].playerName}>
						
					</th>
					{/each}
				<tr/>
		</thead>
		<Footer/>
		<tbody >
   		{#each roundTableData as {icon},rowptr}
		    <tr class=" border-2 border-black text-right bg-white">
			    <td class="border-2 border-black" >
					 <!-- Using slug to pass which round is being processed by the domino capture page -->
					<a  href="/{rowptr}" >{@html icon}
					</a>
				</td>
				
			    	{#each $playerScore as rndScore,colptr}
			    	<td class="border-2  border-black align-bottom " contenteditable="true"
						 id='score{rowptr}{colptr}'
						bind:innerHTML={$playerScore[colptr].pScore[rowptr]} >
                		{rndScore.pScore[rowptr]}
					</td>
			    	{/each}
				
		    </tr>
	        {/each}	
		</tbody>
    </table>
</div>
</body>
