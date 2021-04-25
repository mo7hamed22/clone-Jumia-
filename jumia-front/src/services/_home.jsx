import axios from "axios";
export const homeServices = {
  getAllProducts,
  getAllCats,
  getProduct,
  getByCatName,
  getAllSliders,
  getProductsByType,

  getSiteSettings,
};

function getAllSliders() {
  return axios.get("http://localhost:8080/settings/get-sliders");
}

function getAllProducts() {
  return axios.get("http://localhost:8080/product/get-all");
}

function getProduct(nameEn) {
  return axios.post("http://localhost:8080/product/get-product", {
    nameEn: nameEn,
  });
}

function getAllCats() {
  return axios.get("http://localhost:8080/category/getAllCategories");
}

function getByCatName() {
  return axios.get("http://localhost:8080/product/getbycat");
}

function getProductsByType(type) {
  return axios.get("http://localhost:8080/product/get-Product-type/" + type);
}

function getSiteSettings() {
  return axios.get("http://localhost:8080/settings/get-settings");
}