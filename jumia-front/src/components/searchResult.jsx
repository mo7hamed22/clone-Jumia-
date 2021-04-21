import React, { useEffect } from "react";
import "./css/heading.css";
import "./css/Product.css";

import Error from "../Error";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import ProductDetailView from "../views/product/Detail";

function Heading({ term, searchResult }) {
  useEffect(
    () => {
      console.log("searchHHH", searchResult);
      console.log("input", term);
    },
    (err) => {
      console.log(err);
    }
  );

  return (
    <>
      {term != null ? (
        <h5 className="heading">You Searched For {`${term}`}</h5>
      ) : (
        ""
      )}

      <div className="row">
        {searchResult.length === 0 ? (
          <Error product={term} className="heading" />
        ) : (
          searchResult.map((item) => (
            <div className="card col-3 bg-white ">
              <div className="card-image">
                <img src={item.image} alt={item.nameEn} width="50%" />
              </div>
              <h5 className="card-title title ">{item.nameEn}</h5>
              <h6 className=".product_price">
                {" "}
                EGP <small>{item.price}</small>
              </h6>

              <Link to={`product/detail/${item.nameEn}`}>
                <button className=" button  col-6   ">Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    searchResult: state.searchResult,
    term: state.term,
  };
};

export default connect(mapStateToProps)(Heading);
