import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faHistory,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const ProfileSiderBar = lazy(() =>
  import("../../components/account/ProfileForm")
);

const OrdersView = (props) => {
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8080/user/is-login", {
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((data) => {
          data.json().then((data) => {
            if (data.message == "User Not Found") {
              console.log(data.message, "offline");
            } else {
              setUser(data.orders);
              console.log(user);
            }
          });
        })
        .catch((e) => {
          if (e.message == "User Not Found") {
            console.log(e.message, "offline");
          }
        });
    }
  }, []);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-4">
          <ProfileSiderBar />
        </div>
        <div className="col-md-8">
          <div className="container mb-3">
            <h4 className="my-3">Orders</h4>
            <div className="row g-3">
              <div className="list-group">
              {
                 user&&user.map((order,index)=>{
                   var address;
            
                 try{
                  address=JSON.parse(order.address)
                 }catch(e){
                   console.log(e)
                 }
                   return(
                    
                     
                     <a
                  href="#"
                  key={index}
                  className="list-group-item list-group-item-action "
                >
                  <div    key={index}
                   className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Order ID :{order.paymentId}</h5>
                    <small>Shipping Date :{order.orderDate}</small>
                  </div>
                  <p className="mb-1">address:{address&&address.address}</p>
                  <small>Order funds :{order.orderFunds} EGP</small>
                </a>
                    
                   )
                 })
               }
               
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
