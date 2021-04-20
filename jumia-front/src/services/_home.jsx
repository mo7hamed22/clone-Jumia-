import axios from "axios";
export const homeServices = {
  getAllProducts,
  getAllCats,
  getProduct,
};

function getAllProducts() {
  return axios.get("http://localhost:8080/product/get-all");
}

function getProduct(nameEn) {
  return axios.post("http://localhost:8080/product/get-product",{nameEn:nameEn});
}

function getAllCats() {
  return axios.get("http://localhost:8080/category/getAllCategories");
}


