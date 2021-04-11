import axios from 'axios';
export const userService = {
  LogIn
}
function LogIn(email, password) {
  return axios.post('http://localhost:8080/auth/login', { email, password })
    // .then(
    //   user => {
    //     if (user.data.token) {
    //       localStorage.setItem('user', JSON.stringify(user.data));
    //     }

    //     return user;
    //   });
}