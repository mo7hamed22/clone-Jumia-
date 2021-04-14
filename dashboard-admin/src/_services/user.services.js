import axios from 'axios';
import { authHeader } from '_helper/auth-header';
export const userService = {
  LogIn,
  AddUser,
  GetAllUsers
}
function LogIn(email, password) {
  return axios.post('http://localhost:8080/auth/login', { email, password })
}
function AddUser(name,email,password,age,cart) {
  return axios.post('http://localhost:8080/auth/signup', { name,email,password,cart,age })
}

function GetAllUsers() {
  let token = JSON.parse(localStorage.getItem('token'));
  const header = { headers: { Authorization: `Bearer ${token}` } }

  return axios.get('http://localhost:8080/user/getAll',header)
  
}