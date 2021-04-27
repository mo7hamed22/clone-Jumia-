import React from "react";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CacheOnDelivery from "./cacheOnDelivery";
import { connect } from "react-redux";

import "./checkout.css";

const CheckoutView = (props) => {
  const search = useLocation().search;

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
                    props.history.push("/account/profile");
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
          console.log(data.data);
          if (data.data.redirect) window.location.href = data.data.redirect;
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("not");
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
    console.log(e.target);
    localStorage.setItem("address", JSON.stringify(fullAddress));
    setClasses(true);
  };
  return (
    <React.Fragment>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Checkout</h1>
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
                Edit information
              </Button>
            </div>
            <form
              onSubmit={handleSubmit}
              className={`hide  ${toggleClasses ? "d-none" : ""}`}
            >
              <div className={`card mb-3`}>
                <div className="card-header">
                  <IconEnvelope className="i-va" /> Contact Info
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        aria-label="Email Address"
                        onChange={handleEmail}
                        value={email}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile no"
                        aria-label="Mobile no"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <IconTruck className="i-va" /> Shipping Infomation
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        required
                        onChange={handleName}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Addresss"
                        required
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address 2 (Optional)"
                        onChange={handleAddress2}
                      />
                    </div>
                    <div className="col-md-4">
                      <select
                        onChange={getCountry}
                        className="form-select"
                        required
                      >
                        <option value>-- Country --</option>
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
                        <option value>-- State --</option>
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
                        <option value>-- city --</option>
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
                Continue to CheckOut
              </Button>
            </form>
            <div className={`col-md-12 ${toggleClasses ? "" : "d-none"}`}>
              <div className="card-header">
                <IconTruck className="i-va" /> Payment Method
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card-header">
                    <IconTruck className="i-va mr-2" />
                    Cache On delivery
                  </div>
                  <div className="card-body">
                    <CacheOnDelivery
                      items={userCart && userCart}
                      address={fullAddress && fullAddress}
                      user={props.user&&props.user}
                    />
                
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card-header">
                    <IconTruck className="i-va mr-2" />
                    PayPal
                  </div>
                  <div className="card-body">
                    <form onSubmit={payment}>
                      <Button
                        type="submit"
                        style={{
                          border: "0",
                        }}
                        variant="outlined"
                        className="paypal_btn"
                      >
                        

                         <img 
                       style={{width:'30%'}}
                         src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt=""/>
                       
                           
                        <span className="paypal_btn_content">Buy Now</span>
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <IconCart3 className="i-va" /> Cart{" "}
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
                  <span>Total (USD)</span>
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
      {/* <PayPalButton
        amount=''
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " );

          // OPTIONAL: Call your server to save the transaction
          // return fetch("/paypal-transaction-complete", {
          //   method: "post",
          //   body: JSON.stringify({
          //     orderID: data.orderID
          //   })
          // });
        }}
      /> */}
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    items: state.cartReducer.items,
    user: state.cartReducer.userInfo,
  };
};
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     setOrders: (cart) => {
//       dispatch(makeOrder(cart))
//     },
//     doPayment:()=>{
//       dispatch(beforePayment)
//     }
//   }
// }
export default connect(mapStateToProps)(CheckoutView);
