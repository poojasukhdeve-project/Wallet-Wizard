import Link from "next/link"

export default function Category({category, index}:any){

return(

<tr>

<td>{index+1}</td>

<td>
<Link href={`/category/${category.id}`}>
{category.name}
</Link>
</td>

<td>{category.created_at}</td>

</tr>

)

}