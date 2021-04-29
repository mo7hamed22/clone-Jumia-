import React from "react";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CacheOnDelivery from "./cacheOnDelivery";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import "./checkout.css";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const CheckoutView = (props) => {
  const {t} =useTranslation();
  const search = useLocation().search;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [fullAddress, setFullAddress] = React.useState({});
  const [countries, setCountries] = React.useState([]);
  const [token, setToken] = React.useState("");
  const [states, setSates] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [userCart, setUserCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [name, setName] = React.useState(props.user.name);
  const [email, setEmail] = React.useState(props.user.email);
  const [address, setAddress] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [toggleClasses, setClasses] = React.useState(false);
  const [spinner,setSpinner]=React.useState('')
  const getCountry = (e) => {
    setFullAddress({ ...fullAddress, country: e.target.value });
    fetch(`https://www.universal-tutorial.com/api/states/${e.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }).then((data) =>
      data.json().then((state) => {
        setSates(state);
      })
    );
  };
  const getCity = (e) => {
    const totalPrice = localStorage.getItem("total");
    setFullAddress({ ...fullAddress, state: e.target.value });
    setTotal(totalPrice);
    setItems(() => {
      return userCart.map((item) => {
        return {
          name: item.nameEn,
          sku: item.nameEn,
          price: item.price - (item.price * item.discount) / 100,
          currency: "USD",
          quantity: item.selectedQuantity,
        };
      });
    });
    fetch(`https://www.universal-tutorial.com/api/cities/${e.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((data) => {
        data.json().then((city) => {
          setCity(city);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    if (props.location.search) {
      const paymentId = new URLSearchParams(search).get("paymentId");
      const orderToken = new URLSearchParams(search).get("token");
      const PayerID = new URLSearchParams(search).get("PayerID");
      const totalPrice = localStorage.getItem("total");
      setOpen(true);
      if (totalPrice) {
        axios({
          url: "http://localhost:8080/order/set-order",
          method: "post",
          // headers:{
          //  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODFmYTJmYTc2NDBhMjllMGM4ZmVkMSIsImlhdCI6MTYxOTM5NDg3OSwiZXhwIjoxNjE5NDE2NDc5fQ.znfafu6gcRfisVjybUnHGIoakOYK23ant5rMMlQ2CGg`
          // },
          data: {
            paymentId: paymentId,
            orderDate: new Date(),
            payerId: PayerID,
            userId: props.user._id,
            orderToken: orderToken,
            orderFunds: totalPrice,
          },
        })
          .then((data) => {
            if (data.data.orderDate) {
              const { paymentId, payerId, orderFunds, orderDate } = data.data;
              const token = localStorage.getItem("token");
              const Address = localStorage.getItem("address");
              const newOrders = props.user.orders;
              newOrders.push({
                paymentId: paymentId,
                payerId: payerId,
                orderDate: orderDate,
                orderFunds: orderFunds,
                address: Address,
              });

              axios({
                method: "put",
                url: "http://localhost:8080/user/orders",
                data: { orders: newOrders },
                headers: { Authorization: `Bearer ${token}` },
              })
                .then((user) => {
                  if (user.data == "User Updated") {
                    localStorage.removeItem("total");
                    localStorage.removeItem("address");
                    localStorage.removeItem("cart");
                    setOpen(false);
                    props.history.push("/account/orders");
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
    fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
      headers: {
        Accept: "application/json",
        "api-token":
          " jIk1nqX7pWDOcwrBlEOJn-1MPLCF-7dfaUWxQP_RxvePV08pzY-Z3Jia9ydaRQfaxco",
        "user-email": "mahmuodaboalhassan@gmail.com",
      },
    })
      .then((data) => {
        data
          .json()
          .then((data1) => {
            setToken(data1.auth_token);
            fetch("https://www.universal-tutorial.com/api/countries", {
              headers: {
                Authorization: `Bearer ${data1.auth_token}`,
                Accept: "application/json",
              },
            }).then((data) => {
              data.json().then((data) => {
                setCountries(data);
              });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });

    try {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("http://localhost:8080/user/get-cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((data) =>
            data.json().then((data) => {
              if (data != "undefined") {
                setUserCart(data.cart);
              }
            })
          )
          .catch((e) => {
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [setToken, setCountries, setUserCart, setItems, setTotal]);

  const getCityAddress = (e) => {
    setFullAddress({ ...fullAddress, city: e.target.value });
  };
  const payment = (e) => {
    setSpinner('spinner-border')
    e.preventDefault();
    setItems(() => {
      return userCart.map((item) => {
        return {
          name: item.nameEn,
          sku: item.nameEn,
          price: item.price - (item.price * item.discount) / 100,
          currency: "USD",
          quantity: item.selectedQuantity,
        };
      });
    });
    const totalPrice = localStorage.getItem("total");
    if (totalPrice && items) {
      var create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "https://localhost:3000/checkout",
          cancel_url: "http://cancel.url",
        },
        transactions: [
          {
            item_list: {
              items: items,
            },
            amount: {
              currency: "USD",
              total: total,
            },
            description: "This is the payment description.",
          },
        ],
      };
      axios({
        url: "http://localhost:8080/payment/paypal-payment",
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODFmYTJmYTc2NDBhMjllMGM4ZmVkMSIsImlhdCI6MTYxOTM5NDg3OSwiZXhwIjoxNjE5NDE2NDc5fQ.znfafu6gcRfisVjybUnHGIoakOYK23ant5rMMlQ2CGg`,
        },
        data: {
          create_payment_json,
        },
      })
        .then((data) => {

          if (data.data.redirect) window.location.href = data.data.redirect;
          setSpinner('')
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setFullAddress({ ...fullAddress, address: e.target.value });
  };
  const handleAddress2 = (e) => {
    setAddress2(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("address", JSON.stringify(fullAddress));
    setClasses(true);
  };
  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">{t("checkOut")}</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">
            <div
              className={`card-header hide ${toggleClasses ? "" : "d-none"}`}
            >
              <Button
                onClick={() => setClasses(false)}
                type="submit"
                style={{
                  backgroundColor: "#f68b1e",
                  color: "#ffff",
                  fontWeight: "bold",
                  width: "300px",
                }}
                variant="contained"
              >
                {" "}
                {t("editInfo")}
              </Button>
            </div>
            <form
              onSubmit={handleSubmit}
              className={`hide  ${toggleClasses ? "d-none" : ""}`}
            >
              <div className={`card mb-3`}>
                <div className="card-header">
                  <IconEnvelope className="i-va" /> {t("ContactInfo")}
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder={t("emailAddress")}
                        aria-label="Email Address"
                        onChange={handleEmail}
                        value={email}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder={t("mobileNo")}
                        aria-label="Mobile no"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <IconTruck className="i-va" /> {t("shippingInfo")}
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("name")}
                        value={name}
                        required
                        onChange={handleName}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("address")}
                        required
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("address2")}
                        onChange={handleAddress2}
                      />
                    </div>
                    <div className="col-md-4">
                      <select
                        onChange={getCountry}
                        className="form-select"
                        required
                      >
                        <option value>-- {t("country")} --</option>
                        {countries &&
                          countries.map((country) => {
                            return (
                              <option
                                key={country.country_name}
                                value={country.country_name}
                              >
                                {country.country_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-select"
                        required
                        onChange={getCity}
                      >
                        <option value>-- {t("state")} --</option>
                        {states &&
                          states.map((state) => {
                            return (
                              <option key={state.state_name}>
                                {state.state_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-select"
                        required
                        onChange={getCityAddress}
                      >
                        <option value>-- {t("city")} --</option>
                        {city &&
                          city.map((city) => {
                            return (
                              <option key={city.city_name}>
                                {city.city_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#f68b1e",
                  color: "#ffff",
                  fontWeight: "bold",
                  width: "300px",
                }}
                variant="contained"
              >
                {" "}
               
               {t("continueToCheckOut")}
              </Button>
            </form>
            <div className={`col-md-12 ${toggleClasses ? "" : "d-none"}`}>
              <div className="card-header">
                <IconTruck className="i-va" /> Payment Method
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className={classes.root}>
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <div className={classes.heading}>Cash on Delivery</div>
                        <div className={classes.secondaryHeading}>
                          you will pay when delivery
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <CacheOnDelivery
                            items={userCart && userCart}
                            address={fullAddress && fullAddress}
                            user={props.user && props.user}
                          />
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <div className={classes.heading}>Pay With PayPal</div>
                        <div className={classes.secondaryHeading}>
                          Pay with your PayPal Account
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                        <div class={`${spinner} text-info`} role="status">
  <span className="sr-only">Loading...</span>
</div>
                          <Button
                            onClick={payment}
                            type="button"
                            style={{
                              border: "0",
                            }}
                            variant="outlined"
                            className="paypal_btn"
                          >
                            <img
                              style={{ width: "30%" }}
                              src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
                              alt=""
                            />

                            <span className="paypal_btn_content">Buy Now</span>
    
                          </Button>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
        
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <IconCart3 className="i-va" /> {t("cart")}{" "}
                <span className="badge bg-secondary float-right">
                  {props.items}
                </span>
              </div>
              <ul className="list-group list-group-flush">
                {userCart &&
                  userCart.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between lh-sm"
                      >
                        <div>
                          <h6 className="my-0">{item.nameEn}</h6>
                          <div style={{ width: "100px" }}>
                            <img
                              className="d-block w-100 "
                              src={item.image}
                              alt="item"
                            />
                            <div>{t("quantity")}:{item.selectedQuantity}</div>
                          </div>
                          <small className="text-muted"></small>
                        </div>
                        <span className="text-muted">
                          EGP {item.price - (item.price * item.discount) / 100}
                        </span>
                      </li>
                    );
                  })}

                <li className="list-group-item d-flex justify-content-between">
                  <span>{t("total")} (EGP)</span>
                  <strong>
                    {userCart &&
                      userCart.reduce((sum, next) => {
                        return (
                          sum +
                          (next.price - (next.price * next.discount) / 100) *
                            next.selectedQuantity
                        );
                      }, 0)}
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    items: state.productReducer.items,
    user: state.productReducer.userInfo,
  };
};

export default connect(mapStateToProps)(CheckoutView);
