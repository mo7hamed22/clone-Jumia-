import axios from 'axios';
export const productService = { 
  getAllProducts
}

function getAllProducts() {
//   let token = JSON.parse(localStorage.getItem('token'));
//   const header = { headers: { Authorization: `Bearer ${token}` } }

  return axios.get('http://localhost:8080/product/get-all')
  
}