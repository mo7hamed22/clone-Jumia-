import React,{useEffect} from 'react'

const Test =()=>{
useEffect(()=>{
fetch('http://localhost:8080/user/getAll',
{
   
    method:"GET",
    headers:{
        authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzAzOTc1ZWYwZjNjYjdmODVhN2ZjNCIsImlhdCI6MTYxNzk3MTA3NiwiZXhwIjoxNjE3OTkyNjc2fQ.5RyrIjSZZZw0tndEFSmtyJ0Hb6TcO9734AjPAZnh1e8'
    }
}).then(data=>{
    data.json().then(data=>{
        console.log(data)
    })
}).catch(err=>{
    console.log(err,'error')
})

},[])

    return(
        <div>
Hellor
        </div>
    )
}
export default Test;