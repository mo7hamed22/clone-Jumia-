import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import{setItems} from '../../Store/actions';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { useTranslation } from "react-i18next";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
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
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Cart = (props) => {
  const { t } = useTranslation();
  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);
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
  const getItem = (product) => {
    const items =
      product &&
      product.reduce((sum, product) => {
      
        return sum + parseInt(product.selectedQuantity);
      }, 0);
    props.onIncrementItems(items);
  
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
   
    
    setTimeout(() => {
      getItem(newCart);
      clearInterval(timer);
      setProgressShow(true);
    }, 500);
  };
  const handleChange = (event, index) => {
    setProgressShow(false);
   
    const product = cart[index];
    product.selectedQuantity = event.target.value;
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
      getItem(cart);
      clearInterval(timer);
      setProgressShow(true);
    }, 500);
    
  };
  React.useEffect(() => {
      const cartFromLocalStorage = getCartFromLocalStorage();
        setCart(cartFromLocalStorage);
        getItem(cart);
  
  }, [setCart, props.totalItems]);
const toCheckOut=()=>{
if(props.userLogin){
  const token= localStorage.getItem('token')
if(token){
  axios({
    method: "put",
    url: "http://localhost:8080/user/cart",
    data: {cart:cart},
    headers: { Authorization: `Bearer ${token}`}
  }).then(data=>{
    localStorage.setItem('total',total)
  props.history.push('/checkout')
  }).catch(e=>{
    console.log(e,'error')
  })}


}else{

handleOpenModal()
}
}
const body = (
  <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title">{t("LoginToContinue")}</h2>
    <p id="simple-modal-description">
   {t("loginCredential")}

   <Link to='/account/login' style={{textDecoration:'none',color:'orangered',marginLeft:'10px'}}>{t("login")}</Link>
    </p>
  
  </div>
);
 

  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
  };
  const Total = (subTotal) => {
    total += subTotal;
    return total;
  };
  const subTotalPrice = (index) => {
    const product = cart[index];
   
    const total = product.selectedQuantity * (product.price - (product.price * product.discount) / 100);
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
    <>
  
    {props.totalItems == 0 ||!cart? <div className='container'>

<div className="row">
  <div className="col-12 d-flex justify-content-center">
  <img src="https://www.jumia.com.eg/images/oshun/cart/empty-cart.png" alt=""/>
  </div>

</div>
<div className="row p-3">
  <div className="col-12 justify-content-center d-flex text-muted">
    <h2>{t("emptyCart")}</h2>
  </div>
  
</div>
<div className="row mt-3 ">
    <div className="col-12 d-flex justify-content-center">
 
    <Button
                  type="button"
                  style={{
                    backgroundColor: "#f68b1e",
                    color: "#ffff",
                    fontWeight: "bold",
                    width:'300px',
                    marginLeft:'10px'
                  }}
                  variant="contained"
               onClick={()=>props.history.push('/')}
                >
                  {" "}
                {t("ContinueToShopping")}
                </Button>
    </div>
  </div>
    </div> :




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
            <h3>{t("cart")} : {props.totalItems} {t("item")} </h3>
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
          <div className="col-6  ">{t("items")}</div>
          <div className="col-2 d-flex justify-content-center">{t("quantity")}</div>
          <div className="col-2 d-flex justify-content-center">{t("price")}</div>
          <div className="col-2 d-flex justify-content-center">{t("SubTotal")}</div>
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
                            src={item.image}
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
                              <Link to={`/product/detail/${item.nameEn}`}
                              style={{textDecoration:'none',color:'orangered'}}
                              >
                              
                          {item.nameEn}
                              </Link>
                            </div>
                            <div
                              className="col-12 m-3"
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              
                              <div className="btn btn-sm btn-danger"
                                style={{ color: "#fff", cursor: "pointer" }}
                                onClick={() => removeItem(index)}
                              >
                                <DeleteOutlineIcon /> {t('remove')}
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
                    style={{marginTop: '15px'}}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={item.selectedQuantity}
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                    >
                      {createSelectItems(item.prodQuantity).map((item) => item)}
                    </Select>
                  </FormControl>
                </div>

                <div className="col-2 d-flex justify-content-center flex-column">
               <p> {t("currency")}{item.price - (item.price * item.discount) / 100}   
               <span               
               className='rounded p-1 bg-warning  mr-2 small'
               > {item.discount}%</span></p>
               <p className='small text-muted mr-2' style={{textDecoration:'line-through'}}> {t("currency")} {item.price}</p>
                </div>
                <div
                  className="col-2 d-flex justify-content-center"
                  style={{ color: "orange", fontWeight: "bolder" }}
                >
                  {t("currency")} {subTotalPrice(index)}
                </div>
              
              
              </div>
            );
          })}
        <div
          className="row mt-5 p-3"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            backgroundColor: "#fff",
          }}
        >
          
          <div className="row">
          
            <div className="col d-flex justify-content-end">
             
                <Button
                onClick={toCheckOut}
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
                  {t("ContinueToCheckOut")}
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
                 {t("ContinueToShopping")}
                </Button>
              
                <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      {body}
      </Modal>

            </div>
            <div className="col d-flex justify-content-end mb-3">
            <div>
              <h2 style={{ fontWeight: "bold" }}>
                {" "}
                {t("total")}: {t("currency")} <span style={{ color: "orangered" }}>{total.toFixed(2)}</span>
              </h2>
            </div>
          </div>
          
          </div>
        </div>
      </div>
    </div>}
    
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementItems: (items) => dispatch(setItems(items)),
  };
};
const mapStateToProps = (state) => {
  return {
    totalItems: state.productReducer.items,
    userLogin:state.productReducer.isOnline
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
