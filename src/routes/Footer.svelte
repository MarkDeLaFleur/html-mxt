<script>
       import { playerScore } from "$lib/myFunctions/TableStore";
 
       function calcScore(pScorearr){
              let sum = 0;
              pScorearr.forEach(item => {
                     if (!(isNaN(parseInt(item)))){
                        sum += parseInt(item)}
               });
              return  sum; 
       }
</script>

<tfoot class="border-2 border-black sticky bottom-0 px-6 py-3 text-red-900 bg-red-300">
       <tr >

       
              <td class="text-left py-0 border-2 border-black sticky bottom-0 font-bold text-sm ">
                       TOTAL
               </td>

              {#each $playerScore as players}
              <td	class="py-0 text-right border-2 border-black" >  
                    {calcScore(players.pScore) }
              </td>
              {/each}
       </tr>

       
</tfoot>

