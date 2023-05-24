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
	<p class="font-semibold text-align text-xl  ">Mexican Train Score Keeper and Pip Counter</p>
<div class="container w-full">

  <table  class=" table-fixed border-2 border-black ml-5 mx-auto text-left" >
	
		<thead class="sticky top-1 border-black text-red-900" >
				<tr >
					<th class="border-2 border-black text-red-900"> 
						Round      
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
			    <td class="border-2 border-black " >
					 <!-- Using slug to pass which round is being processed by the domino capture page -->
					<a  href="/{rowptr}" >{@html icon}
					</a>
				</td>
				
			    	{#each $playerScore as rndScore,colptr}
			    	<td class="border-2  border-black align-bottom  " contenteditable="true"
						 id='score{rowptr}{colptr}'
						bind:innerHTML={$playerScore[colptr].pScore[rowptr]} >
                		{rndScore.pScore[rowptr]}
					</td>
			    	{/each}
				
		    </tr>
	        {/each}	
		</tbody>
    </table>
	<p class="mx-auto ml-5"><br>
		Change the player's name by moving the pointer to the field and overtyping. <br/>
		Click on one of the domino Icons to use the camera to count the dominos.<br/>
		Manually enter a score by moving the pointer to the appropriate cell.

	</p>
	
</div>

</body>
