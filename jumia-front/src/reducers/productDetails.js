var count = 0;
export const productReducer = (state = count, action) => {
  if (action.type === "PLUS") {
    count++;
    if (count >= action.quantity) {
      return (count = action.quantity);
    }
    return (state = count);
  } else if (action.type === "MINUS") {
    count--;
    if (count <= 0) {
      return (count = 0);
    }
    return (state = count);
  } else if (action.type === "ADDTOCART") {
    count = 1;
    const product = { ...action.product, quantity: count };
    const cartList = [product];
    const cart = localStorage.getItem("cart");
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify(cartList));
    } else {
      const newCart = [...cart];
      newCart.push(product);
      localStorage.setItem("cart",JSON.stringify(newCart));
    }

    return (state = count);
  }
  return state;
};
