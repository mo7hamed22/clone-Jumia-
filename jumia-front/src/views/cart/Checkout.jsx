import React from "react";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconReceipt } from "bootstrap-icons/icons/receipt.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { connect } from "react-redux";

const CheckoutView = (props) => {
  const [countries, setCountries] = React.useState([]);
  const [token, setToken] = React.useState("");
  const [states, setSates] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [userCart, setUserCart]=React.useState([]);
  const getCountry = (e) => {
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
            console.log(data1.auth_token);
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
try{
  const token = localStorage.getItem('token')
  if(token){
    fetch('http://localhost:8080/user/get-cart',{
   
     headers: { Authorization: `Bearer ${token}`}
    }).then(data=>data.json().then(data=>{
      console.table(data)
      setUserCart(data.cart)
    })).catch(e=>{
      console.log(e)
    })
  }
}catch(e){
console.log(e)
}

  }, []);

  return (
    <React.Fragment>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Checkout</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
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
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address 2 (Optional)"
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
                    <select className="form-select" required onChange={getCity}>
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
                    <select className="form-select" required>
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

            <div className="card mb-3">
              <div className="card-header">
                <IconReceipt className="i-va" /> Billing Infomation
                <div className="form-check form-check-inline ml-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Same as Shipping Infomation
                  </label>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address 2 (Optional)"
                    />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- Country --</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- State --</option>
                      <option>California</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3 border-info">
              <div className="card-header bg-info">
                <IconCreditCard2Front className="i-va" /> Payment Method
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3 border-bottom">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        Credit card
                        <img
                          src="../../images/payment/cards.webp"
                          alt="..."
                          className="ml-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                        <img
                          src="../../images/payment/paypal_64.webp"
                          alt="..."
                          className="ml-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Card number"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration month"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration year"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer border-info">
                <button type="button" className="btn btn-block btn-info">
                  Pay Now <strong>$162</strong>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <IconCart3 className="i-va" /> Cart{" "}
                <span className="badge bg-secondary float-right">{props.items}</span>
              </div>
              <ul className="list-group list-group-flush">
               {userCart&&userCart.map((item,index)=>{
                 return (<li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                 <div>
                   <h6 className="my-0">{item.nameEn}</h6>
                   <div style={{width:'100px'}}>
                     <img className='d-block w-100 ' src={item.image} alt="item"/>
                   </div>
                   <small className="text-muted">

                   </small>
                 </div>
                 <span className="text-muted">EGP {(item.price- (item.price * item.discount )/100)}</span>
               </li>)
               })}
               
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>{userCart&&userCart.reduce((sum,next)=>{
   return sum + ((next.price- (next.price * next.discount )/100)*next.selectedQuantity)
                  },0)}</strong>
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
    items: state.cartReducer.items
  }
}
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     dispatch1: () => {
//       dispatch(actionCreator)
//     }
//   }
// }
export default connect(mapStateToProps)(CheckoutView);
