import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
// import { link45, file, check2all } from "../npm/icon";
import { useTranslation } from "react-i18next";
import { data } from "../data";
import Slider from "./product/slider";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import TopMenu from "../components/TopMenu";

import { homeServices } from "../services/_home";
const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() =>
  import("../components/card/CardDealsOfTheDay")
);

class HomeViewClass extends Component {
  components = {
    IconLaptop: IconLaptop,
    IconHeadset: IconHeadset,
    IconPhone: IconPhone,
    IconTv: IconTv,
    IconDisplay: IconDisplay,
    IconHdd: IconHdd,
    IconUpcScan: IconUpcScan,
    IconTools: IconTools,
  };

  constructor(props) {
    super(props);

    this.state = {
      cats: [],
      products: [],
      suerpMarkets: [],
      sliders: [],
      fashions: [],
      phones: [],
      homes: [],
      electronics: [],
      settings: {},
      two_img_ad: [],
      slider_siblings: [],
    };
  }

  componentDidMount() {
    homeServices.getSiteSettings().then(
      (data) => {
        this.setState({
          settings: data.data,
          two_img_ad: data.data.two_img_ad,
          sliders: data.data.sliders,
          slider_siblings: data.data.slider_siblings,          
        });
      },
      (err) => {
        console.log(err);
      }
    );

    homeServices.getAllCats().then(
      (data) => {
        this.setState({
          cats: data.data,
        });
        homeServices.getByCatName().then(
          (data) => {
            this.setState({
              suerpMarkets: data.data[0],
              fashions: data.data[1],
              phones: data.data[2],
              homes: data.data[3],
              electronics: data.data[4],
            });
            console.log("products", this.state);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );

    homeServices.getAllProducts().then(
      (data) => {
        this.setState({
          products: data.data,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  render() {
    // console.log("products", this.state.products);

    const iconProducts = data.iconProducts;
    const rows = [...Array(Math.ceil(iconProducts.length / 4))];
    const productRows = rows.map((row, idx) =>
      iconProducts.slice(idx * 40, idx * 40 + 40)
    );
    const carouselContent = productRows.map((row, idx) => (
      <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
        <div className="row g-3">
          {row.map((product, idx) => {
            const ProductImage = this.components[product.img];
            return (
              <div
                key={idx}
                className="col-md-3"
                onClick={(e) => setProductCat(e.target.value)}
              >
                <CardIcon
                  title={product.title}
                  text={product.text}
                  tips={product.tips}
                  to={product.to}
                >
                  <ProductImage className={product.cssClass} />
                </CardIcon>
              </div>
            );
          })}
        </div>
      </div>
    ));
    function setProductCat(catNAme) {
      console.log("catName", catNAme);
      return catNAme;
    }

    return (
      <React.Fragment>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-md-2">
              <TopMenu data={this.state.cats} />
            </div>
            <div className="col-md-8">
              <Banner
                className="mb-3"
                id="carouselHomeBanner"
                data={this.state.sliders}
                onClick={(e) => setProductCat(e.target)}
              />
            </div>
            <div className="col-md-2">
              {this.state.slider_siblings.map((item=>
              <div className="card mt-1">
                <img src={item} />
              </div>              
              ))}
            </div>
          </div>
        </div>
        <br />

        <div className="container mb-3">
          <div className="row">
            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/JumiaMall_.png"
                  style={{ width: "40px" }}
                />
                <a target="_blank" href="https://www.jumia.com.eg/jumia-mall/">
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("offical")}
                  </b>
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/JumiaGlobal.png"
                  style={{ width: "40px" }}
                />
                <a
                  target="_blank"
                  href="https://www.jumia.com.eg/mlp-jumia-global/"
                >
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("jumiaGlobal")}
                  </b>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/JumiaOne_1.png"
                  style={{ width: "40px" }}
                />
                <a
                  target="_blank"
                  href="https://pay.jumia.com.eg/services/recharge?utm_source=jumia&utm_medium=mall&utm_campaign=Teaser"
                >
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("jumiaDoniation")}
                  </b>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/Artboard_1222.png"
                  style={{ width: "40px" }}
                />
                <a
                  target="_blank"
                  href="https://www.jumia.com.eg/sp-orange-redemption/"
                >
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("orangePoints")}
                  </b>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card p-2">
                <div className="card-header bg-warning">
                  <h4>{this.props.trans('superMarket')}</h4>
                </div>
                <Slider data={this.state.suerpMarkets} />
              </div>
            </div>
          </div>
        </div>
       
        <div className="container bg-light mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card p-2">
                <div className="card-header bg-warning">
                  <h4>{this.props.trans('fashion')}</h4>
                </div>
                <Slider data={this.state.fashions} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.state.two_img_ad.map((item) => (
              <div className="col-md-6">
                <div className="card">
                  <img src={item} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container bg-light mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card p-2">
                <div className="card-header bg-warning">
                  <h4>{this.props.trans('PhonesTablets')}</h4>
                </div>
                <Slider data={this.state.phones} />
              </div>
            </div>
          </div>
        </div>

        <div className="container bg-light mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card p-2">
                <div className="card-header bg-warning">
                  <h4>{this.props.trans('homeOffice')}</h4>
                </div>
                <Slider data={this.state.homes} />
              </div>
            </div>
          </div>
        </div>

        <div className="container bg-light mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card p-2">
                <div className="card-header bg-warning">
                  <h4>{this.props.trans('electroic')}</h4>
                </div>
                <Slider data={this.state.electronics} />
              </div>
            </div>
          </div>
        </div>

        <section className="container mt-2 mb-2" style={{ fontSize: "12px" }}>
          <div className="card p-3">
            <div className="markup -pvs">
              <h1>Jumia Egypt – Biggest Online Shopping Website</h1>

              <p>
                Online shopping sites are now part of our everyday lives,
                because everyone enjoys the possibility of being able to buy
                whatever they need, whether it’s clothing or{" "}
                <a href="https://www.jumia.com.eg/electronics/">
                  <b>electronics</b>
                </a>
                , without having to move an inch. It’s even better when you can
                buy everything you’re looking for, all from the same store. This
                is what Jumia Egypt offers and that’s what makes it one of the
                best online shopping websites in Egypt.
              </p>

              <h2>Enjoy Endless Deals &amp; Discounts</h2>

              <p>
                Jumia is an easy platform to use when you’re online shopping for
                any type of products you’re looking for. Even if you’re just
                browsing, we assure you that you will find something you like in
                our catalog. Our <b>clothing store</b> provides you with over
                one million products and variations to choose from! You can shop
                for anything you need from women fashion to baby clothes and get
                the latest{" "}
                <a href="https://www.jumia.com.eg/category-fashion-by-jumia/">
                  <b>fashion</b>
                </a>
                . Jumia Egypt is one of the biggest online shopping sites
                because we always try to expand our catalog to provide any
                possible products or gadgets our customer could be searching to
                buy online!
              </p>

              <h2>Shop Now for All Products Online</h2>
              <h3>Order Electronics &amp; Appliances Here</h3>

              <p>
                Check off your <b>grocery</b> list with our{" "}
                <a href="https://www.jumia.com.eg/groceries/">
                  <b>online supermarket</b>
                </a>{" "}
                which is filled with all the canned goods and fresh foods you
                could possibly think of. You can easily shop for all variations
                of{" "}
                <a href="https://www.jumia.com.eg/home-office-appliances/">
                  <b>appliances</b>
                </a>{" "}
                for your home from a large selection which include appliances
                such as a{" "}
                <a href="https://www.jumia.com.eg/appliances-fridges-freezers/">
                  <b>fridge</b>
                </a>
                , washing machine or{" "}
                <a href="https://www.jumia.com.eg/air-conditioning/">
                  <b>air conditioner</b>
                </a>
                , for example.
              </p>
              <p>
                Our catalog for electronics offers you the highest quality
                products from trusted sellers and brands; you can show for a new{" "}
                <a href="https://www.jumia.com.eg/televisions/">
                  <b>television</b>
                </a>{" "}
                for your living room, your favorite{" "}
                <a href="https://www.jumia.com.eg/smartphones/">
                  <b>smartphone</b>
                </a>{" "}
                or even a new{" "}
                <a href="https://www.jumia.com.eg/playstation4-consoles/">
                  <b>PlayStation 4</b>
                </a>
                or
                <a href="https://www.jumia.com.eg/5/">
                  <b>PS5</b>
                </a>
                , for example. Get the latest releases of{" "}
                <b>mobiles and tablets</b> before anyone else in town, whether
                you want to buy a new phone from{" "}
                <a href="https://www.jumia.com.eg/phones-tablets/apple/">
                  <b>Apple</b>
                </a>
                , Infinix, Xiaomi, Realme or{" "}
                <a href="https://www.jumia.com.eg/phones-tablets/samsung/">
                  <b>Samsung</b>
                </a>
                , for example. Another amazing category available is one
                dedicated to computers,{" "}
                <a href="https://www.jumia.com.eg/laptops/">
                  <b>laptops</b>
                </a>{" "}
                and all their accessories. Shop for{" "}
                <a href="https://www.jumia.com.eg/printers/">
                  <b>printers</b>
                </a>
                , scanners, computer components and monitors to enhance your
                computer or laptop experience to the max! All these products are
                provided in <b>Jumia Egypt</b> for you to discover and buy, and
                enjoy the fastest delivery anywhere in Egypt.
              </p>

              <h3>Indulge in a Selection of Beauty Products</h3>

              <p>
                Our onlinestore also offers you the best beauty products from
                world-wide known brands. Anything related to{" "}
                <a href="https://www.jumia.com.eg/health-beauty/">
                  <b>health and beauty</b>
                </a>
                , cosmetics and{" "}
                <a href="https://www.jumia.com.eg/fragrances-allgenders/">
                  <b>fragrances</b>
                </a>{" "}
                can be found at our online store. Discover our{" "}
                <a href="https://www.jumia.com.eg/baby-products/">
                  <b>baby shop</b>
                </a>{" "}
                for all baby essentials from food and diapers to toys and
                education games. Start online shopping for furniture and home
                décor for each and every room in your house.{" "}
              </p>
              <p>
                Order our{" "}
                <a href="https://www.jumia.com.eg/all-products/?shop_premium_services=shop_express">
                  <b>Jumia Express</b>
                </a>{" "}
                products, which are stocked in Jumia’s warehouse, which means
                you will enjoy express shipping and have your products delivered
                to you in no time! There are endless categories and
                subcategories of products available to help you reach the
                products you’re looking for at <b>Jumia Egypt</b>. Also, many of
                our products are shipped from overseas under the{" "}
                <a href="https://www.jumia.com.eg/global-store/?internal=fm-global">
                  <b>Jumia Global</b>
                </a>{" "}
                catalog, which will all be shipped to your doorstep, wherever
                you are.
              </p>

              <h2>Discover the Online Shopping World</h2>

              <p>
                Jumia Egypt offers <b>deals and discounts</b> and never ceases
                to form campaigns all year around, all for the satisfaction and
                joy of our customers. Our newsletter subscribers and Facebook
                fans get to know all of our offers before anyone else such as
                Mobile &amp; Tech Week, Ramadan, Jumia Anniversary, Black Friday
                &amp;{" "}
                <a href="https://www.jumia.com.eg/mlp-mother-day/">
                  <b>Mother's Day</b>
                </a>{" "}
                Also, You can buy tickets for concerts and important events
                online @ Jumia. We have a dedicated team who will answer your
                questions instantly on social media and customer service is
                available through the week to help solve any issues and answer
                all inquiries, simply reach us as <b>19586</b>. Moreover, you
                can join Jumia’s partnership team to open your shop on Jumia
                Egypt and sell your products to our customers. Jumia Egypt
                promises to provide you with the best service and{" "}
                <b>100% genuine</b> products. We deliver your order at your
                doorstep as fast as possible, offer you safe and secure payments
                and also provide free returns, which you can read more about in
                our refund and return policy. Stay tuned and get the best prices
                in Egypt on all your favorite products!
              </p>
              <p>
                <a href="https://www.jumia.com.eg/mlp-stay-safe/">
                  <b>Stay safe</b>
                </a>{" "}
                and{" "}
                <a href="https://www.jumia.com.eg/stay-comfy/">
                  <b>stay comfy</b>
                </a>{" "}
                and learning about COVID-19 facts. <b>Stay home</b> and shop for
                all your{" "}
                <a href="https://www.jumia.com.eg/supermarket-deals/">
                  <b>home essentials</b>
                </a>{" "}
                and we will have it delivered to your doorstep as soon as
                possible with{" "}
                <a href="https://www.jumia.com.eg/contactless-delivery/">
                  <b>contactless delivery</b>
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const HomeView = () => {
  const { t } = useTranslation();
  return <HomeViewClass trans={t} />;
};

export default HomeView;
