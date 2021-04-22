var count = 0;
export const productReducer = (state = count, action) => {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (action.type === "PLUS") {
    const newCart = [...cart];
    newCart.find((product)=>{
      if(product.nameEn === action.name){
        product.selectedQuantity++
        if(product.selectedQuantity >= product.prodQuantity){
          product.selectedQuantity = product.prodQuantity;
        }
        count = product.selectedQuantity;
      }
    })
      localStorage.setItem("cart",JSON.stringify(newCart))
    return (state = count);
  } else if (action.type === "MINUS") {
    const newCart = [...cart];
    newCart.find((product,index,arr)=>{
      if(product.nameEn === action.name){
        product.selectedQuantity--
        if(product.selectedQuantity <= 0){
          arr.splice(index,1);
          product.selectedQuantity = 0;
        }
        count = product.selectedQuantity;
      }
    })
    localStorage.setItem("cart",JSON.stringify(newCart))
    return (state = count);
  } else if (action.type === "ADDTOCART") {
    count = 1;
    const product = { ...action.product, selectedQuantity: count };
    const cartList = [product];
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify(cartList));
    } else {
      const newCart = [...cart];
      newCart.push(product);
      localStorage.setItem("cart",JSON.stringify(newCart));
    }

    return (state = count);
  } else if (action.type==="LOAD"){
    if(cart){
      cart.find(product=>{
        if(product.nameEn===action.name){
          count = product.selectedQuantity;
        }
      })
    }
    return (state = count);
  }
  return state;
};
