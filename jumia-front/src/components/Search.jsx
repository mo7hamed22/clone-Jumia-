import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { homeServices } from "../services/_home";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./css/heading.css";

import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";

const Search = (props) => {
  console.log("props", props);
  let SearchArray = [];
  const [products, setProducts] = React.useState([]);

  const [input, setInput] = React.useState("");
  const history = useHistory();

  // Get All Products
  useEffect(() => {
    homeServices.getAllProducts().then(
      (data) => {
        setProducts(data.data);
        console.log("SearchArray", SearchArray);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  SearchArray = [].concat(products);
  console.log("SearchArray", SearchArray);
  function search(e) {
    e.preventDefault();
    const filteredContent = products.filter((item) => {
      return (
        item.nameEn.toLowerCase().includes(input) ||
        item.nameAr.toLowerCase().includes(input)
        // item.product_cat.toLowerCase().includes(input)
      );
    });
    console.log("filtered", filteredContent);
    props.searchResult(filteredContent);
    props.setTerm(input);

    history.push("/search/searchResult");
  }

  return (
    <>
      <form className="">
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
          {!input ? (
            ""
          ) : (
            <button
              className="btn btn-warning text-white"
              type="submit"
              onClick={search}
            >
              <Link to="/search/">
                Search <IconSearch />
              </Link>
            </button>
          )}
        </div>
      </form>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchResult: (filteredContent) =>
      dispatch({ type: "SET_SEARCH_TERM", value: filteredContent }),
    setTerm: (input) => dispatch({ type: "SET_TERM", value: input }),
  };
};
export default connect(null, mapDispatchToProps)(Search);
