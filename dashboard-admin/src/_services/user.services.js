import axios from "axios";

export const userService = {
  login
}

function login(userEmail,password) {
  
  return axios.post('http://localhost:8080/user/login',{userEmail,password})
    .then(handleResponse)
    .then(user => {
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user))
      return user;
  })

}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}