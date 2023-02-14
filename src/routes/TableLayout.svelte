<script>

    import Footer from './Footer.svelte';
    import {roundTableData } from './IconSvg.js';
    import {playerScore} from './TableStore.js'
    
        //  SVG files can't be loaded directly into the html without finagling so I 
        // created the dominos with google draw, saved as svg the optimized using a utility. 
    
    
        
</script>
<div class="container ">

  <table class=" table-flex md:table-fixed w-full border" >
	
		<thead class="border sticky top-0 text-red-900 bg-red-300">
            <tr >
                <th	> #
			    </th>
	
			    {#each $playerScore as players,playerIndex}
			    <th  class="border "
				    contenteditable="true" bind:innerHTML={$playerScore[playerIndex].playerName}
			        >{players.playerName}
			    </th>
			    {/each}
		    <tr/>
		</thead>
		<Footer/>
		<tbody >
    <!-- Remove the nasty inline CSS fixed height on production and replace it with a CSS class — this is just for demonstration purposes! -->
			{#each roundTableData as {icon},rowptr}
		    <tr class="even:bg-green-300 odd:bg-yellow-400 ">
			    <td class="	bg-white " >
					<a  href="/{rowptr}" >{@html icon}
						</a>
					
				    
			    </td>
		
			    {#each $playerScore as rndScore,colptr}
			    <td	class="border text-end " contenteditable="true"
                    bind:innerHTML= {$playerScore[colptr].pScore[rowptr]}>
			        {rndScore.pScore[rowptr]}
			    </td>
			    {/each}
		    </tr>
	        {/each}	
		</tbody>
    </table>
</div>