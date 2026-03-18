import Link from "next/link"

export default function Transaction({transaction,index}:any){

return(

<tr>

<td>{index+1}</td>

<td>
<Link href={`/transaction/${transaction.id}`}>
{transaction.name}
</Link>
</td>

<td>{transaction.category_name}</td>

<td>{transaction.date}</td>

<td>${transaction.amount}</td>

<td>{transaction.created_at}</td>

</tr>

)

}