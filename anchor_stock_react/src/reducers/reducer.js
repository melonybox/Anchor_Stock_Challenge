const initialState = {
  currentUser: {},
  bodyView: 'default'
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUser: action.payload, bodyView: 'portfolio'}
      default:
        return state;
  }
}
