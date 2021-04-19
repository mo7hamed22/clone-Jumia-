import axios from "axios";
export const homeServices = {
  getAllProducts,
};

function getAllProducts() {
  return axios.get("http://localhost:8080/product/get-all");
}

