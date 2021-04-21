
const actions= require('./actions')
const initialState={
    items:0,
    userInfo:''
}

const cart =localStorage.getItem('cart')
if(cart){
    const products = JSON.parse(cart)
 initialState.items  =  products.reduce((sum,item)=>{
return sum + parseInt(item.proQuantity)
  },0) }

const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.GET_ITEMS:
return {...state,items:state.items=action.value}
case 'USER': 

const userInfo = {...action.value};
return  {...state,userInfo:{...userInfo}}

}
    return state
}






export default cartReducer