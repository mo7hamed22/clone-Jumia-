import axios from "axios";
export const homeServices = {
  getAllProducts,
  getAllCats
};

function getAllProducts() {
  return axios.get("http://localhost:8080/product/get-all");
}


function getAllCats() {
  return axios.get("http://localhost:8080/category/getAllCategories");
}


