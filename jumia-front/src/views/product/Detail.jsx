import React, { useEffect, lazy } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactStars from "react-rating-stars-component";
import {
  faCartPlus,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { homeServices } from "../../services/_home";
import { useParams } from "react-router-dom";
const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);

function ProductDetailView(props) {
  const [product, setProduct] = React.useState({});
  const [image, setImage] = React.useState([]);
  const [activeImg, setActiveImg] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [productType, setProductType] = React.useState("");
  const [review, setReview] = React.useState([]);
  let { proName } = useParams();
  useEffect(() => {
    props.onLoad(proName);
    homeServices.getProduct(proName).then((pro) => {
      setActiveImg(pro.data.image[0]);
      setImage(pro.data.image);
      setProduct(pro.data);
      setProductType(product.product_cat);
      homeServices
        .getProductsByMainCat(pro.data.product_cat.main)
        .then((data) => {
          setProducts(data.data);
        });
    });
    homeServices.getProductReview(product._id).then((data) => {      
      setReview(data.data);
    });
    
  }, [setProduct, setProducts]);
  const stars = {
    size: 30,
    value: 4,
    edit: false,
  };
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img src={activeImg} className="img-fluid mb-3" alt="" />
              {image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="border border-secondary mr-2"
                  width="75"
                  onClick={() => setActiveImg(img)}
                />
              ))}
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline mr-2">{product.nameEn}</h1>
              <div className="mb-3 d-flex align-items-center">
                <ReactStars {...stars} /> 
              </div>

              <div className="mb-3">
                <p className="font-weight-bold h5 mr-2">
                  EGP{product.price - (product.price * product.discount) / 100}
                </p>
                <del className="small text-muted mr-2">EGP{product.price}</del>
                <span className="rounded p-1 bg-warning  mr-2 small">
                  {product.discount}%
                </span>
              </div>
              <div className="mb-3">
                {props.count ? (
                  <div className="d-inline mr-2">
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={() => props.onMinus(proName)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="badge m-1 text-body">{props.count}</span>
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={() => props.onPlus(product.nameEn)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <span className="badge m-1 text-body">
                        {props.count} Item(s) Added
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary mr-2 w-100"
                    title="Add to cart"
                    onClick={() =>
                      props.onAddToCart({
                        nameEn: product.nameEn,
                        price: product.price,
                        discount: product.discount,
                        prodQuantity: product.quantity,
                        image: activeImg,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-link active"
                    id="nav-details-tab"
                    data-toggle="tab"
                    href="#nav-details"
                    role="tab"
                    aria-controls="nav-details"
                    aria-selected="true"
                  >
                    Details
                  </a>
                  <a
                    className="nav-link"
                    id="nav-randr-tab"
                    data-toggle="tab"
                    href="#nav-randr"
                    role="tab"
                    aria-controls="nav-randr"
                    aria-selected="false"
                  >
                    Ratings & Reviews
                  </a>
                  
                  <a
                    className="nav-link"
                    id="nav-ship-returns-tab"
                    data-toggle="tab"
                    href="#nav-ship-returns"
                    role="tab"
                    aria-controls="nav-ship-returns"
                    aria-selected="false"
                  >
                    Shipping & Returns
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3 small" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  <Details description={product.description} />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-randr"
                  role="tabpanel"
                  aria-labelledby="nav-randr-tab"
                >
                  <RatingsReviews productID={product._id} />
                </div>              
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <ShippingReturns />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <CardFeaturedProduct data={products} />
          <CardServices />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { count: state.productReducer.count };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPlus: (proName) => dispatch({ type: "PLUS", name: proName }),
    onMinus: (proName) => dispatch({ type: "MINUS", name: proName }),
    onAddToCart: (userProduct) =>
      dispatch({ type: "ADDTOCART", product: userProduct }),
    onLoad: (proName) => dispatch({ type: "LOAD", name: proName }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailView);
