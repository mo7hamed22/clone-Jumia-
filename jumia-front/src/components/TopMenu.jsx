import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { homeServices } from "../services/_home";
import { useTranslation } from "react-i18next";
import './topMenu.css';

const TopMenu = (props) => {
   const { t } = useTranslation();
 const [products, setProducts] = React.useState([]);
  // Get All Products
  useEffect(() => {
    homeServices.getAllProducts().then(
      (data) => {
        setProducts(data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  function setProductCat(catNAme, indx) { 
    products.filter((product) => {
      return;
    });
  }
  console.log("Data", props.data);
  return (
    <nav id="vertical-menu">
      <ul className="main-menu">
        {props.data.map((item, index) => (
          <li
            key={index}
            className={`${item.subCategory ? "contain-submenu" : ""}`}
          >             
            <Link to={`/category/${item.nameEn}`}>
                      {t(item.nameEn)}
                    </Link>
                    <svg dangerouslySetInnerHTML={{ __html: item.icon }} />
            <ul className="submenu-1">
              {item.subCategory &&
                item.subCategory.map((sub, index) => (
                  <li
                    onClick={(e) => setProductCat(e.target, index)}
                    key={index}
                    className={`${sub.subCatArray ? "contain-submenu" : ""}`}
                  >
                    <Link to={`/category/${item.nameEn}/${sub.subCatName}`}>
                      {sub.subCatName}
                    </Link>

                    <ul className="submenu-2">
                      {sub.subCatArray &&
                        sub.subCatArray.map((arr, index) => (
                          <li
                            key={index}
                            onClick={(e) => setProductCat(e.target)}
                            className={`${
                              sub.subCatArray ? "contain-submenu" : ""
                            }`}
                          > 
                            <Link to={`/category/${item.nameEn}/${sub.subCatName}/${arr}`}>{arr}</Link>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchResult: (filteredContent) =>
      dispatch({ type: "SET_SEARCH_TERM", value: filteredContent }),
    setTerm: (input) => dispatch({ type: "SET_TERM", value: input }),
  };
};
export default connect(null, mapDispatchToProps)(TopMenu);
