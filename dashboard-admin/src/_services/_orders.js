import axios from "axios";
export const orderServic = {
  getAllOrders,
};

function getAllOrders() { 
  return axios.get("http://localhost:8080/order/get-all");
}