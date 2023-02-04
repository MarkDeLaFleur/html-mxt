<script>
       import { playerScore } from "./TableStore";
 
       function calcScore(pScorearr){
              let sum = 0;
              pScorearr.forEach(item => {
                     if (!(isNaN(parseInt(item)))){
                        sum += parseInt(item)}
               });
              return  sum; 
       }
</script>

<tfoot class="border sticky bottom-0 px-6 py-3 text-red-900 bg-red-300">
       <tr >

       
              <td class="px-6 py-0 border sitcky bottom-0">
                       TOTAL
               </td>

              {#each $playerScore as players}
              <td	class="px-6 py-0 text-right border" >  
                    {calcScore(players.pScore) }
              </td>
              {/each}
       </tr>

       
</tfoot>

