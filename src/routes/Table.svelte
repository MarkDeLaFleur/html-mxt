<script>
import SVGdoubleTwelve from '$lib/svelteIcons/DoubleTwelve.svelte';
import SVGdoubleEleven from '$lib/svelteIcons/DoubleEleven.svelte';
import SVGdoubleTen    from '$lib/svelteIcons/DoubleTen.svelte';
import SVGdoubleNine   from '$lib/svelteIcons/DoubleNine.svelte';
import SVGdoubleEight  from '$lib/svelteIcons/DoubleEight.svelte';
import SVGdoubleSeven  from '$lib/svelteIcons/DoubleSeven.svelte';
import SVGdoubleSix    from '$lib/svelteIcons/DoubleSix.svelte';
import SVGdoubleFive   from '$lib/svelteIcons/DoubleFive.svelte';
import SVGdoubleFour   from '$lib/svelteIcons/DoubleFour.svelte';
import SVGdoubleThree  from '$lib/svelteIcons/DoubleThree.svelte';
import SVGdoubleTwo    from '$lib/svelteIcons/DoubleTwo.svelte';
import SVGdoubleOne    from '$lib/svelteIcons/DoubleOne.svelte';
import SVGdoubleBlank  from '$lib/svelteIcons/DoubleBlank.svelte';

export let playerNameTable = [{blankColumn: "Round",
		playerName1: " ",
		playerName2: " ", playerName3: " ", playerName4: " ",
		playerName5: " ", playerName6: " ", playerName7: " ", playerName8: " "}];

export let roundTableData = [
		{rScore12: "D12", scoreC1: "12", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore11: "D11",scoreC1: "11", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore10: "D10",scoreC1: "10", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore9:  "D09",scoreC1: "09", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore8:  "D08",scoreC1: "08", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore7:  "D07",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore6:  "D06",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore5:  "D05",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore4:  "D04",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore3:  "D03",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore2:  "D02",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore1:  "D01",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore0:  "D00",scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
	];
	/**
	 * @type {any}
	 */
	 export let style;
</script>

<table class={style}>
	<thead>
		<tr>
			{#each Object.values(playerNameTable[0]) as columnHeading}
				<th>{columnHeading}</th>
			{/each}
		<tr/>
	</thead>
	<tbody>
		{#each Object.values(roundTableData) as row}
			<tr>
			{#each Object.values(row) as cell}
			{#if  cell == "D12"}
				<td class="w-6" >
					<SVGdoubleTwelve class = "h-10 w-5"/>
				</td>
			{/if}	
			{#if cell == "D11"}
				<td class="w-6" >
				<SVGdoubleEleven class = "h-10 w-5"/>
				</td>
			{/if}		
			{#if cell == "D10"}
					<td class="w-6" >
					<SVGdoubleTen class = "h-10 w-5"/>
					</td>
			{/if}	
			{#if cell == "D09"}
				<td class="w-6" >
				<SVGdoubleNine class = "h-10 w-5"/>
				</td>
			{/if}				
			{#if cell == "D08"}
				<td class="w-6" >
				<SVGdoubleEight class = "h-10 w-5"/>
				</td>
			{/if}	
			{#if cell == "D07"}
				<td class="w-6" >
				<SVGdoubleSeven class = "h-10 w-5"/>
			
			</td>
			{/if}
				{#if cell == "D06"}
				<td class="w-6" >
				<SVGdoubleSix class = "h-10 w-5"/>
				</td>
							
			{/if}
			{#if cell == "D05"}
				<td class="w-6" >
				<SVGdoubleFive class = "h-10 w-5"/>
				</td>
						
			{/if}
			{#if cell == "D04"}
				<td class="w-6" >
				<SVGdoubleFour class = "h-10 w-5"/>
				</td>
			{/if}
			{#if cell == "D03"}
				<td class="w-6" >
				<SVGdoubleThree class = "h-10 w-5"/>
				</td>
			{/if}
			{#if cell == "D02"}
				<td class="w-6" >
				<SVGdoubleTwo class = "h-10 w-5"/>
				</td>
					
			{/if}	
			{#if cell == "D01"}
				<td class="w-6" >
				<SVGdoubleOne class = "h-10 w-5"/>
				</td>
						
			{/if}	
			{#if cell == "D00"}
				<td class="w-6" >
				<SVGdoubleBlank class = "h-10 w-5"/>
				</td>
			{:else}
			
				<td class="w-8">{cell} </td>
			{/if}	
			
			 {/each}
			</tr>
		{/each}
		
	</tbody>
</table>

<style>
	table, th, td{
		border: 1px solid;
		border-collapse: collapse;
		margin-bottom: 10px;
	}
	
	table.redTable {
		border: 2px solid #A40808;
		background-color: #EEE7DB;
		width: 100%;
		text-align: center;
		border-collapse: collapse;
	}
	table.redTable td, table.redTable th {
		border: 1px solid #AAAAAA;
		padding: 3px 2px;
	}
	table.redTable tbody td  {
		font-size: 13px;
	}
	table.redTable img{
		display:block;
	}
	table.redTable tr:nth-child(even) {
		background: #F5C8BF;
	}
	table.redTable thead {
		background: #A40808;
		background: -moz-linear-gradient(top, #bb4646 0%, #ad2020 66%, #A40808 100%);
		background: -webkit-linear-gradient(top, #bb4646 0%, #ad2020 66%, #A40808 100%);
		background: linear-gradient(to bottom, #bb4646 0%, #ad2020 66%, #A40808 100%);
	}
	table.redTable thead th {
		font-size: 19px;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		border-left: 2px solid #A40808;
	}
	table.redTable thead th:first-child {
		border-left: none;
	}

		table.blueTable {
		border: 1px solid #1C6EA4;
		background-color: #EEEEEE;
		width: 100%;
		text-align: left;
		border-collapse: collapse;
	}
	table.blueTable td, table.blueTable th {
		border: 1px solid #AAAAAA;
		padding: 3px 2px;
	}
	table.blueTable tbody td {
		font-size: 13px;
	}
	table.blueTable tr:nth-child(even) {
		background: #D0E4F5;
	}
	table.blueTable thead {
		background: #1C6EA4;
		background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
		background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
		background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
		border-bottom: 2px solid #444444;
	}
	table.blueTable thead th {
		font-size: 15px;
		font-weight: bold;
		color: #FFFFFF;
		border-left: 2px solid #D0E4F5;
	}
	table.blueTable thead th:first-child {
		border-left: none;
	}
</style>
