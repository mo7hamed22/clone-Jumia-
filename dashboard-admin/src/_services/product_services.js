import axios from "axios";
export const productService = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct
};

function getAllProducts() {
  return axios.get("http://localhost:8080/product/get-all");
}

function createProduct(product) {
  let token = JSON.parse(localStorage.getItem("token"));
  const header = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post("http://localhost:8080/product/add", product, header);
}

function deleteProduct(id) {
  let token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  };  
  return axios({
    method: "delete",
    url: "http://localhost:8080/product/delete",
    data: { id: id },
    headers: { Authorization: `Bearer ${token}`}
  });
}

function updateProduct(product) {  
  let token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  };  

  return axios({
    method: "post",
    url: "http://localhost:8080/product/update",
    data: {product},
    headers: { Authorization: `Bearer ${token}`}
  });

 
}
