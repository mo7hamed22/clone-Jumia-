

const initialState={
    items:0
}


const 
 reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_ITEMS':
return {...state,items:state.items=action.value}


    }
    return state
}
export default reducer