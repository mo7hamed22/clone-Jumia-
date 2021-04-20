import React, { useEffect, lazy } from "react";
import { connect } from "react-redux";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data";
import { homeServices } from "../../services/_home";
const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));
function ProductDetailView(props) {
  const [product, setProduct] = React.useState({});
  const [image, setImage] = React.useState([]);
  const [activeImg, setActiveImg] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    homeServices
      .getProduct(
        "Samsung Galaxy A21s - 6.5-inch 64GB/4GB Dual SIM Mobile Phone - Black"
      )
      .then((pro) => {
        setActiveImg(pro.data.image[0]);
        setImage(pro.data.image);
        setProduct(pro.data);
        setQuantity(pro.data.quantity);
      });
  }, [setProduct, setCount, setQuantity]);
  console.log(props);
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
              <div className="mb-3">
                <IconStarFill className="text-warning mr-1" />
                <IconStarFill className="text-warning mr-1" />
                <IconStarFill className="text-warning mr-1" />
                <IconStarFill className="text-warning mr-1" />
                <IconStarFill className="text-secondary mr-1" />|{" "}
                <span className="text-muted small">
                  42 ratings and 4 reviews
                </span>
              </div>
              {/* <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                <dd className="col-sm-9">In stock</dd>
                <dt className="col-sm-3">Sold by</dt>
                <dd className="col-sm-9">Authorised Store</dd>
                <dt className="col-sm-3">Size</dt>
                <dd className="col-sm-9">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizes"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="sizes">
                      S
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizem"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="sizem">
                      M
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizel"
                    />
                    <label className="form-check-label" htmlFor="sizel">
                      L
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizexl"
                    />
                    <label className="form-check-label" htmlFor="sizexl">
                      XL
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizexxl"
                    />
                    <label className="form-check-label" htmlFor="sizexxl">
                      XXL
                    </label>
                  </div>
                </dd>
                <dt className="col-sm-3">Color</dt>
                <dd className="col-sm-9">
                  <button className="btn btn-sm btn-primary p-2 mr-2"></button>
                  <button className="btn btn-sm btn-secondary p-2 mr-2"></button>
                  <button className="btn btn-sm btn-success p-2 mr-2"></button>
                  <button className="btn btn-sm btn-danger p-2 mr-2"></button>
                  <button className="btn btn-sm btn-warning p-2 mr-2"></button>
                  <button className="btn btn-sm btn-info p-2 mr-2"></button>
                  <button className="btn btn-sm btn-dark p-2 mr-2"></button>
                </dd>
              </dl> */}

              <div className="mb-3">
                <span className="font-weight-bold h5 mr-2">
                  ${product.price}
                </span>
                {/* <del className="small text-muted mr-2">$2000</del> */}
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
                        onClick={props.onMinus}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="badge m-1 text-body">{props.count}</span>
                      {/* <input
                      type="text"
                      className="form-control"
                      defaultValue={count}
                    /> */}
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={() => props.onPlus(quantity)}
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
                        image: activeImg,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                )}

                {/* <button
                  type="button"
                  className="btn btn-sm btn-warning mr-2"
                  title="Buy now"
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy now
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  title="Add to wishlist"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button> */}
              </div>
              <div>
                <p className="font-weight-bold mb-2 small">
                  Product Highlights
                </p>
                <ul className="small">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Etiam ullamcorper nibh eget faucibus dictum.</li>
                  <li>Cras consequat felis ut vulputate porttitor.</li>
                </ul>
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
                    id="nav-faq-tab"
                    data-toggle="tab"
                    href="#nav-faq"
                    role="tab"
                    aria-controls="nav-faq"
                    aria-selected="false"
                  >
                    Questions and Answers
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
                  <a
                    className="nav-link"
                    id="nav-size-chart-tab"
                    data-toggle="tab"
                    href="#nav-size-chart"
                    role="tab"
                    aria-controls="nav-size-chart"
                    aria-selected="false"
                  >
                    Size Chart
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
                  <Details />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-randr"
                  role="tabpanel"
                  aria-labelledby="nav-randr-tab"
                >
                  {Array.from({ length: 5 }, (_, key) => (
                    <RatingsReviews key={key} />
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-faq"
                  role="tabpanel"
                  aria-labelledby="nav-faq-tab"
                >
                  <dl>
                    {Array.from({ length: 5 }, (_, key) => (
                      <QuestionAnswer key={key} />
                    ))}
                  </dl>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <ShippingReturns />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-size-chart"
                  role="tabpanel"
                  aria-labelledby="nav-size-chart-tab"
                >
                  <SizeChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <CardFeaturedProduct data={data.products} />
          <CardServices />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { count: state.productReducer };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPlus: (proQuantity) => dispatch({ type: "PLUS", quantity: proQuantity }),
    onMinus: () => dispatch({ type: "MINUS" }),
    onAddToCart: (userProduct) =>
      dispatch({ type: "ADDTOCART", product: userProduct }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailView);
