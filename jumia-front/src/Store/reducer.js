
const actions= require('./actions')


const token =localStorage.getItem('token')
const initialState={
    items:0,
    isOnline:false,
    userCart:[]
}
try{
    
  fetch('http://localhost:8080/user/is-login',
  {  method: "post",
   headers: { Authorization: `Bearer ${token}` }}
   ).then(data=>{
     data.json().then(data=>{
        if(data.message == 'User Not Found'){
            console.log(data.message,'offline')
        }  else{
           initialState.isOnline=true;
           initialState.userCart=data.cart
           console.table(initialState)
        }
     })
   }).catch(e=>{
 if(e.message == 'User Not Found'){
     console.log(e.message,'offline')
 }   
 })
}catch(e){
    console.log(e,'catching')
}




const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.GET_ITEMS:
return {...state,items:state.items=action.value}
}
    return state
}
export default cartReducer