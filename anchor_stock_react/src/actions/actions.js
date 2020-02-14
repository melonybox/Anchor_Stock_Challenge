export const userLoginFetch = data => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          // Here you should have logic to handle invalid login credentials.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error
          alert(data.errors)
        } else {
          dispatch(loginUser(data.user))
        }
      })
  }
}

export const userCreateFetch = data => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          // Here you should have logic to handle invalid creation of a user.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error with creating the user, i.e. invalid username
          alert(data.errors)
        } else {
          dispatch(loginUser(data.user))
        }
      })
  }
}

export const loginUser = data => ({
    type: 'LOGIN_USER',
    payload: data
})
