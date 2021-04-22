import React from "react";
import "./components/css/error.css";
import opps from "./assets/opps.gif";
function Error({ product }) {
  return (
    <div className="container">
      <div className="row">
        <p className="display-6 alert alert-danger">
          Please! Search by brand name or product type.
          <br /> Otherwise, we don't have a product as such{" "}
          <strong>{product}</strong>{" "}
        </p>
        <div className="col-md-12 card text-center">
          <div className="error">
            <img src={opps} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
