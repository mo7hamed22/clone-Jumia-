import React, { useEffect } from "react";
import "./css/heading.css";
import "./css/Product.css";
import { formatTitle } from "../pipes/formatTitle";
import Error from "../Error";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import ProductDetailView from "../views/product/Detail";

function Heading({ searchResult, term }) {
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
        <h5 className="heading bg-warning text-center">
          You Searched For <u>{`${term}`}</u>
        </h5>
      ) : (
        ""
      )}
      <div className="container">
        <div className="row">
          {searchResult.length === 0 ? (
            <Error product={term} className="heading" />
          ) : (
            searchResult.map((item) => (
              <div className="col-3 mt-2 text-center">
                <div className="card">
                  <Link to={`/product/detail/${item.nameEn}`}>
                    <div className="card-image">
                      <img src={item.image} alt={item.nameEn} width="50%" />
                    </div>
                  </Link>
                  <h5 className="card-title title ">
                    {formatTitle(item.nameEn)}
                  </h5>
                  <h6 className=".product_price">
                    {" "}
                    EGP <small>{item.price}</small>
                  </h6>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    searchResult: state.cartReducer.searchResult,
    term: state.cartReducer.term,
  };
};

export default connect(mapStateToProps)(Heading);
