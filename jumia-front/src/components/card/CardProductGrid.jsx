import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const CardProductGrid = (props) => {
  const product = props.data;
  return (
    <div className="card">
      <img src={product.image} className="card-img-top img-fluid"  style={{maxHeight: "220px"}}/>
      
        <span className="badge bg-success position-absolute mt-2 ml-2">
        {product.brand}
        </span>
      
      
        <span className="badge bg-danger position-absolute r-0 mt-2 mr-2">
          {product.discount} %
        </span>
            
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={`/product/detail/${product.nameEn}`} className="text-decoration-none">
            {product.nameEn}
          </Link>
        </h6>
        <div className="my-2">
         
          <span className="font-weight-bold h5">${product.price-(product.price*product.discount)/100}</span>
          
            <del className="small text-muted ml-2">${product.price}</del>
          
          <span className="ml-2">
            <IconStarFill className="text-warning mr-1" />
            <IconStarFill className="text-warning mr-1" />
            <IconStarFill className="text-warning mr-1" />
            <IconStarFill className="text-secondary mr-1" />            
          </span>
        </div>
        <div className="btn-group btn-block" role="group">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            title="Add to cart"
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          
          {/* <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Add to wishlist"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button> */}

        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
