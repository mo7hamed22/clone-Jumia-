var count = 0;
var cart = JSON.parse(localStorage.getItem("cart"));
export const productReducer = (state = count, action) => {
  if (action.type === "PLUS") {
    const newCart = [...cart];
    newCart.find((product)=>{
      if(product.nameEn === action.name){
        count = product.quantity;
        count++;
        if(count >= action.quantity){
          return count = action.quantity;
        }
      }
    })
      localStorage.setItem("cart",JSON.stringify(newCart))
    return (state = count);
  } else if (action.type === "MINUS") {
    const newCart = [...cart];
    newCart.find((product,index,arr)=>{
      if(product.nameEn === action.name){
        count = product.quantity;
        count--;
        if(count <= 0){
          arr.splice(index,1);
          return count = 0;
        }
      }
    })
    localStorage.setItem("cart",JSON.stringify(newCart))
    return (state = count);
  } else if (action.type === "ADDTOCART") {
    count = 1;
    const product = { ...action.product, quantity: count };
    const cartList = [product];
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify(cartList));
    } else {
      const newCart = [...cart];
      newCart.find((pro,index,arr)=>{
        if(pro.nameEn===product.nameEn){
          localStorage.setItem("cart",JSON.stringify(newCart));
        } else {
          newCart.push(product);
          localStorage.setItem("cart",JSON.stringify(newCart));
        }
      })
    }

    return (state = count);
  }
  return state;
};
