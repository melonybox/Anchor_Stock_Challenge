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

export const getStockFetch = data => {
  return dispatch => {
    return fetch(`https://cloud.iexapis.com/stable/stock/${data.symbolSearch}/quote?token=${process.env.REACT_APP_API_KEY}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(resp => Promise.all([resp.json(),data]))
      .then(data => {
        dispatch(getStockBuyFetch({stockPrice: data[0].latestPrice, stockSymbol: data[0].symbol, stockAmount: data[1].symbolAmount}))
      })
  }
}

export const getStockBuyFetch = data => {
  return (dispatch, getState) => {
    const stockData = {...data, userId: getState().currentUser.id}
    return fetch("http://localhost:3000/api/v1/buyStock", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(stockData)
    })
      .then(resp => resp.json())
      .then(data => {
        debugger
      })
  }
}

export const loginUser = data => ({
    type: 'LOGIN_USER',
    payload: data
})
