import { useEffect, useState } from "react"
import Category from "./Category"

export default function CategoryList(){

const [categories,setCategories] = useState([])

useEffect(()=>{

fetch("http://localhost:3100/category")
.then(res=>res.json())
.then(data=>setCategories(data))

},[])

return(

<div>

<h3>Category List - <a href="/category/new">Add new</a></h3>

<table>

<thead>

<tr>
<th>Id</th>
<th>Category Name</th>
<th>Created at</th>
</tr>

</thead>

<tbody>

{categories.map((c:any,i:number)=>(
<Category key={c.id} category={c} index={i}/>
))}

</tbody>

</table>

</div>

)

}