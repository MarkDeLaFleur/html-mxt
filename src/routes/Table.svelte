<script>

import doubleTwelve from '../images/DoubleTwelve.svg'
import doubleEleven from '../images/doubleEleven.svg';
import doubleTen    from '../images/doubleTen.svg';
import doubleNine   from '../images/doubleNine.svg';
import doubleEight  from '../images/doubleEight.svg';
import doubleSeven  from '../images/doubleSeven.svg';
import doubleSix    from '../images/doubleSix.svg';
import doubleFive   from '../images/doubleFive.svg';
import doubleFour   from '../images/doubleFour.svg';
import doubleThree  from '../images/doubleThree.svg';
import doubleTwo    from '../images/doubleTwo.svg';
import doubleOne    from '../images/doubleOne.svg';
import doubleBlank  from '../images/doubleBlank.svg';

export let playerNameTable = [{blankColumn: "Round",
		playerName1: " ",
		playerName2: " ", playerName3: " ", playerName4: " ",
		playerName5: " ", playerName6: " ", playerName7: " ", playerName8: " "}];

export let roundTableData = [{
		rScore12: doubleTwelve, scoreC1: "12", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore11: doubleEleven,scoreC1: "11", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore10: doubleTen,scoreC1: "10", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore9:  doubleNine,scoreC1: "09", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore8:  doubleEight,scoreC1: "08", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore7:  doubleSeven,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore6:  doubleSix,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore5:  doubleFive,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore4:  doubleFour,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore3:  doubleThree,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore2:  doubleTwo,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore1:  doubleOne,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
								scoreC5: "", scoreC6: "",scoreC7: "", scoreC8: ""},
		{rScore0:  doubleBlank,scoreC1: "", scoreC2: "",scoreC3: "", scoreC4: "",
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
			{#if  cell.indexOf('/src') > -1}
				<td class="w-6" >
					<img  src={cell}  alt={cell} class="w-6">
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
