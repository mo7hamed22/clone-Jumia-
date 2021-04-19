import axios from "axios";
export const Cats_services = {
  getAllCats,
  createCategory,
};

function getAllCats() {
  return axios.get("http://localhost:8080/category/getAllCategories");
}

function createCategory(category) {
  let token = JSON.parse(localStorage.getItem("token"));
  const header = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(
    "http://localhost:8080/category/addCategory",
    category,
    header
  );
}

// function deleteProduct(id) {
//   let token = JSON.parse(localStorage.getItem("token"));
//   const config = {
//     headers: { Authorization: `Bearer ${token}`},
//   };
//   return axios({
//     method: "delete",
//     url: "http://localhost:8080/product/delete",
//     data: { id: id },
//     headers: { Authorization: `Bearer ${token}`}
//   });
// }

// function updateProduct(product) {
//   let token = JSON.parse(localStorage.getItem("token"));
//   const config = {
//     headers: { Authorization: `Bearer ${token}`},
//   };

//   return axios({
//     method: "post",
//     url: "http://localhost:8080/product/update",
//     data: {product},
//     headers: { Authorization: `Bearer ${token}`}
//   });

// }
