
const actions= require('./actions')
const initialState={
    items:0,
    userInfo:'',
    searchResult: [],
    term: null,
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

case "SET_SEARCH_TERM":
  return {
    ...state,
    searchResult: action.value,
  };
case "SET_TERM":
  return {
    ...state,
    term: action.value,
  };
case 'USER':
const userInfo = {...action.value};
console.log(userInfo ,'from reducer')
return  {...state,userInfo:{...userInfo}}

}
    return state
}






export default cartReducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_ITEMS":
//       return { ...state, items: (state.items = action.value) };
//     case "SET_SEARCH_TERM":
//       return {
//         ...state,
//         searchResult: action.value,
//       };
//     case "SET_TERM":
//       return {
//         ...state,
//         term: action.value,
//       };
//   }

//   return state;
// };

// export default reducer;
