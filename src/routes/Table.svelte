<script>

import Footer from './Footer.svelte';
import {roundTableData } from './IconSvg.js';
import {playerScore} from './TableStore.js'

	//  SVG files can't be loaded directly into the html without finagling so I 
	// created the dominos with google draw, saved as svg the optimized using a utility. 


	
</script>

<table class=" table-flex md:table-fixed w-full border " >
	<thead >
		<tr >
			<th  class="w-12  px-0 py-0 border sticky top-0  text-red-900 bg-red-300"
			contenteditable="false"	> #
			</th>
	
			{#each $playerScore as players,playerIndex}
			<th  class="border sticky top-0 text-red-900 bg-red-300"
				contenteditable="true" bind:innerHTML={$playerScore[playerIndex].playerName}
			>{players.playerName}
			</th>
			{/each}
			
		<tr/>
	</thead>

	<Footer/>
	<tbody class="divide-y " >
	{#each roundTableData as {icon},rowptr}
		<tr class="even:bg-green-300 odd:bg-yellow-400 ">
			<td class=" bg-white "   >
				<a class="" href="/{rowptr}" >{@html icon}</a>
				
			</td>
		
			{#each $playerScore as rndScore,colptr}
			<td	class="text-right border"
			contenteditable="true" 
			bind:innerHTML= {$playerScore[colptr].pScore[rowptr]}>
			{rndScore.pScore[rowptr]}
			</td>
			{/each}
		</tr>
	{/each}	

	
	</tbody>	

</table>

