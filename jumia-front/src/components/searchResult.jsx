import React, { useEffect } from "react";
import "./css/heading.css";
import "./css/Product.css";
import { formatTitle } from "../pipes/formatTitle";
import Error from "../Error";
import { Link } from "react-router-dom";

import { connect } from "react-redux";


function Heading({ searchResult, term }) {

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
                  <Link style={{textDecoration:'none'}} to={`/product/detail/${item.nameEn}`}>
                    {formatTitle(item.nameEn)}
                    </Link>
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
    searchResult: state.productReducer.searchResult,
    term: state.productReducer.term,
  };
};

export default connect(mapStateToProps)(Heading);
