import React from "react";
import { Redirect, Route, Link } from "react-router-dom";

import "./acc.css";
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";
const ProfileSiderBar = (props) => {
  const isLoggedIn = localStorage.getItem("token");

  
  return (
    <>
      {isLoggedIn ? "" : <Redirect to={{ pathname: "/account/login" }} />}

      <div className="card border-primary">
        <h6 className="card-header">
          <IconPersonSquareFill /> Profile Details
        </h6>

        <div className="cardLinks">
          <ul class="list-group">            
            <Link to="/account/orders">
              <li class="list-group-item">Orders</li>
            </Link>           
            <Link to="/support">
              <li class="list-group-item">Support</li>
            </Link>
            <Link to="/contact-us">
              <li class="list-group-item">Contact</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileSiderBar;
