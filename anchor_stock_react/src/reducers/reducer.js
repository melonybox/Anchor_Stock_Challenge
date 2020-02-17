const initialState = {
  currentUser: {},
  bodyView: 'default',
  portfolioStocks: {},
  portfolioPrice: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUser: action.payload, bodyView: 'portfolio'}
      case 'FILL_PORTFOLIO_STOCKS':
        return {...state, ...action.payload}
      case 'ADD_STOCK_TO_USER':
        return {...state,
                currentUser: {
                  ...state.currentUser,
                  stocks: [
                    ...state.currentUser.stocks,
                    action.payload
                  ]
                }}
      case 'HANDLE_SCREEN_SWITCH':
          return {...state, bodyView: action.payload}
      default:
        return state;
  }
}
