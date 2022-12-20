<script>
import { playerNameTable } from "src/routes/TableStore";
export {UpdatePlayer}
function UpdatePlayer(srcName,index){
    playerNameTable.update(v =>{
        v[index].Name=srcName;
        return v;
    })
}

</script>