import React from "react";
import "./casheOnDelivery.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const CacheOnDelivery = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const paymentWithCache = (e) => {
    setOpen(true);
    e.preventDefault();
    const paymentId = (Math.random() * 10).toString().slice(2);
    const token = localStorage.getItem("token");
    const total = localStorage.getItem("total");
    const payerId = (Math.random() * 10).toString().slice(2);

    const newOrders = {
      paymentId: paymentId,
      orderDate: new Date(),
      payerId: payerId,
      userId: props.user._id,
      orderToken: token,
      orderFunds: total,
    };

    axios({
      url: "http://localhost:8080/order/set-order",
      method: "post",

      data: {
        ...newOrders,
      },
    })
      .then((data) => {
        const { paymentId, payerId, orderFunds, orderDate } = data.data;
        const token = localStorage.getItem("token");
        const Address = localStorage.getItem("address");
        const newOrders = props.user.orders;
        newOrders.push({
          paymentId: paymentId,
          payerId: payerId,
          orderDate: orderDate,
          orderFunds: orderFunds,
          address: Address,
        });

        axios({
          method: "put",
          url: "http://localhost:8080/user/orders",
          data: { orders: newOrders },
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((user) => {
            if (user.data == "User Updated") {
              localStorage.removeItem("total");
              localStorage.removeItem("address");
              localStorage.removeItem("cart");
              setOpen(false);
              history.push("/account/orders");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <div className="cont brdt">
        <form
          id="osh-opc-shipping-form"
          className="-validate-form"
          method="post"
          noValidate="novalidate"
        >
          <div
            id="shipping-methods"
            className="osh-opc-shipping-methods-form ft-shipping-methods"
          >
            <div className="subt color-default -pbm -fwm -fs-14">
              How do you want your order delivered?
            </div>
            <div className="list list-options -mbl">
              <div className="list--item list--item-options -ptxl -pbxl brdb">
                <input
                  id="UniversalShippingMatrix"
                  className="osh-radio option"
                  value="UniversalShippingMatrix"
                  rel="Door Delivery."
                  defaultChecked="defaultChecked"
                  type="radio"
                />
                <label className="-fwm" htmlFor="UniversalShippingMatrix">
                  Door Delivery.
                </label>
                <div className="range color-default-800 -fs-13 -plxxxl -prxxxl">
                  Delivered between
                  <span className="-fwm color-default">Monday 3 May</span> and
                  <span className="-fwm color-default">Tuesday 4 May</span>. for
                  <b className="color-primary">
                    <span data-currency-iso="EGP">EGP</span>
                    <span dir="ltr" data-price="25.65">
                      26
                    </span>
                  </b>
                </div>
                <div id="cms">
                  <div className="tip -mlxxxl -mrxxxl">
                    <i className="osh-font-info"></i>
                    <p style={{ color: "black", fontWeight: "bold" }}>
                      * Living in Cairo or Giza,
                      <a style={{ color: "orange" }}>JUMIA PRIMO </a> Members
                      enjoy free delivery on all local orders and Jumia Food.
                      <br />
                      <br />
                      OR enjoy <a style={{ color: "orange" }}>FREE SHIPPING </a>
                      using your <a style={{ color: "orange" }}>Credit Card </a>{" "}
                      for orders starting 300 EGP or above, discount will be
                      applied at checkout.
                      <br />
                      <br />
                      <strong>
                        *Please make sure you have entered your home address,
                        not your office one, so that we can deliver your order
                        successfully
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="cart-rules js-cart-rules -hidden ft-price-cart-rules"></div>
              </div>
            </div>
            <div className="-rad sdgrid brda -mtl -mbl">
              <div className="-upp -fs-13 -fwm color-default brdb -plxl -prxl -ptl -pbl">
                Shipment Details
              </div>
              <div className="-mas -ptxs -pll -prl">
                <div className="shipment-box sdrow -fs-13 -ptm color-default-800">
                  <div className="-fwm -pbl">Shipment 1 of 1</div>
                  <div>
                    <span className="-mrxl">1x</span>Basic Checkered Buttoned
                    Long Sleeves Shirt -Royal Blue
                  </div>
                  <div
                    className="range -fs-14 -ptl -pbm"
                    data-default-delivery-label="Delivered between &amp;lt;span className=&amp;quot;-fwm color-default&amp;quot;&amp;gt;Monday 3 May&amp;lt;/span&amp;gt; and &amp;lt;span className=&amp;quot;-fwm color-default&amp;quot;&amp;gt;Tuesday 4 May&amp;lt;/span&amp;gt;. "
                  >
                    Delivered between
                    <span className="-fwm color-default">Monday 3 May</span> and
                    <span className="-fwm color-default">Tuesday 4 May</span>.
                  </div>
                  <div className="shipment-info -pbm"></div>
                </div>
              </div>
            </div>
            <div className="osh-resume -mtxl -plm -prm">
              <div className="ft-subtotal color-default -pbm price_row ">
                <span className="price_col-desc">Subtotal</span>
                <span className="price_col-value">
                  <span data-currency-iso="EGP">EGP</span>
                  <span dir="ltr" data-price="159">
                    159
                  </span>{" "}
                </span>
                <span className="price_col-value not_applicable-box -b color-primary -hidden">
                  N.A.
                </span>
              </div>
              <div className="applied-shipping ft-shipping-amount color-default -pbm price_row ">
                <span className="price_col-desc">Shipping amount</span>
                <span className="price_col-value -b">
                  <span data-currency-iso="EGP">EGP</span>
                  <span dir="ltr" data-price="25.65">
                    26
                  </span>{" "}
                </span>
                <span className="price_col-value not_applicable-box -b color-primary -hidden">
                  N.A.
                </span>
              </div>
              <div className="applied-customs-fee -hidden color-default -pbm price_row ft-icf">
                <span className="price_col-desc">
                  <i className="osh-font-airplane -fs-12 -prxs"></i>
                  International Delivery Fees
                </span>
              </div>
            </div>

            <Button
              onClick={paymentWithCache}
              type="submit"
              style={{
                backgroundColor: "#f68b1e",
                color: "#ffff",
                fontWeight: "bold",
                width: "300px",
              }}
              variant="contained"
            >
              {" "}
              Make Order
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CacheOnDelivery;
