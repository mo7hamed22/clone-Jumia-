import React from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";

const Search = () => {
  return (
    <form action="#" className=""> {/*search*/}
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search for products"
          required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-warning text-white"
          type="submit"
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
    </form>
  );
};
export default Search;
