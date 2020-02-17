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
      .then(resp => {
        if (resp.ok === false) {
          if (resp.status === 404) {
            return alert("Stock symbol not valid.")
          }
          return alert("Error")
        } else {
          return Promise.all([resp.json(),data])
        }
      })
      .then(data => {
        dispatch(getStockBuyFetch({stockPrice: data[0].latestPrice, stockSymbol: data[0].symbol, stockAmount: data[1].symbolAmount}))
      })
      .catch(() => {
        console.log("Error")
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
        if (data.errors){
          alert(data.errors)
        } else {
          dispatch(addStockToUser({newStock: data.newStock, newUserMoneyAmount: data.userData.money_amount}))
          dispatch(getStockBatchFetch(data.userData.stocks))
        }
      })
  }
}

export const getStockBatchFetch = data => {
  return (dispatch) => {
    let stockData = {}

    for (let i = 0; i < data.length; i++) {
      if (stockData[data[i].symbol] === undefined) {
        stockData[data[i].symbol] = data[i].amount
      } else {
        stockData[data[i].symbol] += data[i].amount
      }
    }

    const batchFetch = Object.keys(stockData).join(",")

    return fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${batchFetch}&types=quote&token=${process.env.REACT_APP_API_KEY}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(resp => Promise.all([resp.json(),stockData]))
      .then(data => {
        let stockReducerData = {}
        let portfolioPrice = 0

        for (let i = 0; i < (Object.keys(data[0]).length); i++) {
          const latestPrice = Object.entries(data[0])[i][1].quote.latestPrice
          const openPrice = Object.entries(data[0])[i][1].quote.open
          const stockSymbol = Object.entries(data[0])[i][0]
          const totalPrice = (Math.round((Object.entries(data[0])[i][1].quote.latestPrice * Object.entries(stockData)[i][1])*100)/100).toFixed(2)
          const stockAmount = Object.entries(stockData)[i][1]
          let stockColor = ''

          portfolioPrice += parseFloat(totalPrice)

          if (latestPrice > openPrice) {
            stockColor = 'greenText'
          } else if (latestPrice < openPrice) {
            stockColor = 'redText'
          } else {
            stockColor = 'greyText'
          }

          stockReducerData[i] = {symbol: stockSymbol, totalPrice: totalPrice, amount: stockAmount, stockTextColor: stockColor}

        }
        dispatch(fillPortfolioStocks({portfolioStocks: stockReducerData, portfolioPrice: (Math.round(portfolioPrice*100)/100).toFixed(2)}))
      })
  }
}

export const loginUser = data => ({
  type: 'LOGIN_USER',
  payload: data
})

export const fillPortfolioStocks = data => ({
  type: 'FILL_PORTFOLIO_STOCKS',
  payload: data
})

export const addStockToUser = data => ({
  type: 'ADD_STOCK_TO_USER',
  payload: data
})

export const handleScreenSwitch = data => ({
  type:'HANDLE_SCREEN_SWITCH',
  payload: data
})
