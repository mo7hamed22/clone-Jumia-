import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
localStorage.setItem('cart',JSON.stringify([
  {
    productName:'pro1',
    proPrice:'200',
    proQuantity:'1',
    proImage:'image',
    quantity:5
  },{
    productName:'pro1',
    proPrice:'300',
    proQuantity:'5',
    proImage:'image',
    quantity:6
  },{
    productName:'pro1',
    proPrice:'400',
    proQuantity:'3',
    proImage:'image',
    quantity:4
  },{
    productName:'pro1',
    proPrice:'500',
    proQuantity:'7',
    proImage:'image',
    quantity:7
  },
  ]))


const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);


const useStyles = makeStyles((theme) => ({
  prefectCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    width: "100%",
    position: "fixed",
    top: "0",
  },
}));

const Cart = (props) => {
  const [progress, setProgress] = React.useState(0);
  const [progressShow, setProgressShow] = React.useState(true);
  let total = 0;
  let items = 0;
  const classes = useStyles();
  const [cart, setCart] = React.useState();
  const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart"));
  };
  const setCartToLocalStorage = (cart) => {
    return localStorage.setItem("cart", JSON.stringify(cart));
  };
  const getItem = (product,con) => {
    const items =
      product &&
      product.reduce((sum, product) => {
        console.log(sum,'sum')
        console.log(product.proQuantity,'pro quantity')
        return sum + parseInt(product.proQuantity);
      }, 0);
    props.onIncrementItems(items);
    console.log(items,con)
    console.log(props.totalItems)
    console.log(con)
  };
  const removeItem = (itemIndex) => {
    setProgressShow(false);
    const newCart = cart.filter((item, index) =>
      index != itemIndex ? item : null
    );
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 300);
    setCartToLocalStorage(newCart);
    setCart(newCart);
    console.log(cart,'new cart after remove')
    console.log(newCart,'this is after state')
    
    setTimeout(() => {
      getItem(newCart,'remove');
      clearInterval(timer);
      setProgressShow(true);
    }, 500);
  };
  const handleChange = (event, index) => {
    setProgressShow(false);
    console.log(cart, "before");
    const product = cart[index];
    product.proQuantity = event.target.value;
    const newCart = cart;
    newCart[index] = product;
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 300);

   

    setTimeout(() => {
      setCartToLocalStorage(newCart);
      getItem(cart,'handlechange');
      clearInterval(timer);
      setProgressShow(true);
    }, 500);
  };
  React.useEffect(() => {
    
      const cartFromLocalStorage = getCartFromLocalStorage();
        setCart(cartFromLocalStorage);
        getItem(cart,'useEffect');
    
  
  }, [setCart, props.totalItems]);

 

  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
  };
  const Total = (subTotal) => {
    total += subTotal;
    return total;
  };
  const subTotalPrice = (index) => {
    const product = cart[index];
    const total = product.proQuantity * product.proPrice;
    // Total(total)
    Total(total);
    return total;
  };

  const createSelectItems = (quantity) => {
    let itemsArray = [];
    for (let i = 1; i <= quantity; i++) {
      itemsArray.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return itemsArray;
  };

  return (
    <div style={{ backgroundColor: "rgb(239, 239, 239)" }}>
      <div className={classes.root}>
        <LinearProgress
          hidden={progressShow}
          variant="determinate"
          value={progress}
        />
      </div>
      <div className="container ">
        <div className="row">
          <div className="col">
            <h3>Cart( {props.totalItems} Items) </h3>
          </div>
        </div>
        <div
          className="row"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
            color: "#565450db",
          }}
        >
          <div className="col-6  ">Item</div>
          <div className="col-2 d-flex justify-content-center">Quantity</div>
          <div className="col-2 d-flex justify-content-center">price</div>
          <div className="col-2 d-flex justify-content-center">SubTotal</div>
        </div>
        {cart &&
          cart.map((item, index) => {
            return (
              <div
                key={index}
                className="row bg-light mt-2"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                }}
              >
                <div className="col-6 ">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex">
                        <div className="col-2 ">
                          <img
                            src="../../images/products/tshirt_red_480x400.webp"
                            width="80"
                            alt="..."
                            className="w-100 d-block"
                          />
                        </div>
                        <div
                          className="col-10 "
                          style={{
                            fontSize: "16px",
                            wordWrap: "break-word",
                            OTextOverflow: "ellipsis",
                          }}
                        >
                          <div className="row">
                            <div className="col-12">
                              {" "}
                              Ideapad 3-15ADA05 Laptop - AMD Ryzen 3-3250U - 8GB
                              RAM - 1TB HDD - Radeon GPU - 15.6-inch HD -
                              Windows 10 - Business Black
                            </div>
                            <div
                              className="col-12 m-3"
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              {" "}
                              <div>Wish List </div>{" "}
                              <div
                                style={{ color: "orange", cursor: "pointer" }}
                                onClick={() => removeItem(index)}
                              >
                                <DeleteOutlineIcon /> Remove
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2 d-flex justify-content-center">
                  <FormControl variant="outlined">
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={item.proQuantity}
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                    >
                      {createSelectItems(item.quantity).map((item) => item)}
                      {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-2 d-flex justify-content-center ">
                  {item.proPrice}
                </div>
                <div
                  className="col-2 d-flex justify-content-center"
                  style={{ color: "orange", fontWeight: "bolder" }}
                >
                  EGP {subTotalPrice(index)}
                </div>
              </div>
            );
          })}
        <div
          className="row mt-5 pt-5"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            backgroundColor: "#fff",
          }}
        >
          <div className="col d-flex justify-content-end mb-3">
            <div>
              <h2 style={{ fontWeight: "bold" }}>
                {" "}
                Total: EGP <span style={{ color: "orangered" }}>{total}</span>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-end">
             
                <Button
                  type="button"
                  style={{
                    backgroundColor: "#f68b1e",
                    color: "#ffff",
                    fontWeight: "bold",
                    width:'300px'

                  }}
                  variant="contained"
                  
                >
                  {" "}
                  Continue to CheckOut
                </Button>
              
              
                <Button
                  type="button"
                  style={{
                    backgroundColor: "#fff",
                    color: "#f68b1e",
                    fontWeight: "bold",
                    width:'300px',
                    marginLeft:'10px'
                  }}
                  variant="contained"
               onClick={()=>props.history.push('/')}
                >
                  {" "}
                 Continue to Shipping
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementItems: (items) => dispatch({ type: "ADD_ITEMS", value: items }),
  };
};
const mapStateToProps = (state) => {
  return {
    totalItems: state.items,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
