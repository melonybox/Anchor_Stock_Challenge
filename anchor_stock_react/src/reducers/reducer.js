const initialState = {
  currentUser: {},
  bodyView: 'default',
  portfolioStocks: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUser: action.payload, bodyView: 'portfolio'}
      case 'FILL_PORTFOLIO_STOCKS':
        return {...state, portfolioStocks: action.payload}
      default:
        return state;
  }
}
