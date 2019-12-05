import {
  GET_PORTFOLIO,
  ADD_BALANCE,
  REMOVE_BALANCE,
  BUY_STOCK,
  SELL_STOCK
} from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case GET_PORTFOLIO: 
    case ADD_BALANCE:
    case REMOVE_BALANCE:
    case BUY_STOCK:
    case SELL_STOCK:
      return { ...action.payload.account }
    default:
      return state
  }
}