import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { homeServices } from "../services/_home";

import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";

const Search = () => {
  let SearchArray = [];
  const [products, setProducts] = React.useState([]);
  const [spinner, setSpinner] = React.useState(true);
  const [cats, setCats] = React.useState([]);
  const [subCatName, setSubCatName] = React.useState("");
  const [subCatArray, setSubCatArray] = React.useState([""]);
  const [subCategory, setSubCategory] = React.useState([
    { subCatName, subCatArray },
  ]);
  const [input, setInput] = React.useState("");

  // Get All Products
  useEffect(() => {
    homeServices.getAllProducts().then(
      (data) => {
        setProducts(data.data);
        console.log("SearchArray", SearchArray);

        setSpinner(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  SearchArray = [].concat(products);
  console.log("SearchArray", SearchArray);
  //Get ALL Category
  // useEffect(() => {
  //   homeServices.getAllCats().then(
  //     (data) => {
  //       setCats(data.data);
  //       setSpinner(false);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }, [setCats]);
  // SearchArray = SearchArray.concat(cats);
  // console.log("SearchArray", SearchArray);

  const filteredContent = SearchArray.filter((input) => {
    return (
      item.nameEn.toLowerCase().includes(input) ||
      item.nameAr.toLowerCase().includes(input)
      // item.product_cat.toLowerCase().includes(input)
    );
  });

  return (
    <>
      <form action="#" className="">
        {" "}
        {/*search*/}
        <div className="input-group">
          <input
            id="search"
            name="search"
            type="text"
            className="form-control"
            // value={input}
            onChange={(e) => setInput(e.currentTarget.value.toLowerCase())}
            placeholder="Search for products"
            required
          />
          <label className="visually-hidden" htmlFor="search"></label>
          <button
            className="btn btn-warning text-white"
            type="submit"
            aria-label="Search"
          >
            <Link to="/search/items">
              <IconSearch />
            </Link>
          </button>
        </div>
      </form>
    </>
  );
};
export default Search;
