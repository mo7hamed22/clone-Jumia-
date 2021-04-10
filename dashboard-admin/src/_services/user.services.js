import axios from "axios";
export const userService = {
  login
}

function login(email, password) {
  const requestOpctions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch('http://localhost:8080/auth/login', requestOpctions);
    // .then(handleResponse)
    // .then(user => {
    //   localStorage.setItem('user', JSON.stringify(user))
    //   return user

    // })

}

function logout() {
    // remove user from local storage to log user out
    return localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    console.log(response);
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