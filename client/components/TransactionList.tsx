import { useEffect,useState } from "react"
import Transaction from "./Transaction"

export default function TransactionList(){

const [transactions,setTransactions] = useState([])

useEffect(()=>{

fetch("http://localhost:3100/transaction")
.then(res=>res.json())
.then(data=>setTransactions(data))

},[])

return(

<div>

<h3>Transaction List - <a href="/transaction/new">Add new</a></h3>

<table>

<thead>

<tr>
<th>Id</th>
<th>Transaction Name</th>
<th>Category Name</th>
<th>Date</th>
<th>Amount</th>
<th>Created at</th>
</tr>

</thead>

<tbody>

{transactions.map((t:any,i:number)=>(
<Transaction key={t.id} transaction={t} index={i}/>
))}

</tbody>

</table>

</div>

)

}