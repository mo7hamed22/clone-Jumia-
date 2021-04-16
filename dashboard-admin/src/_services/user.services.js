import axios from "axios";
import { authHeader } from "_helper/auth-header";
export const userService = {
  LogIn,
  AddUser,
  GetAllUsers,
  DeleteUser,
};
function LogIn(email, password) {
  return axios.post("http://localhost:8080/auth/login", { email, password });
}
function AddUser(name, email, password, age, cart) {
  return axios.post("http://localhost:8080/auth/signup", {
    name,
    email,
    password,
    cart,
    age,
  });
}

function GetAllUsers() {
  let token = JSON.parse(localStorage.getItem("token"));
  const header = { headers: { Authorization: `Bearer ${token}` } };

  return axios.get("http://localhost:8080/user/getAll", header);
}

function DeleteUser(email) {
  let token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // console.log(email);
  return axios({
    method: "delete",
    url: "http://localhost:8080/user/delete",
    data: { email: email },
    headers: { Authorization: `Bearer ${token}` },
  });
}
