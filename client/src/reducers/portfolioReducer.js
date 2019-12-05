import {
  GET_PORTFOLIO,
  BUY_STOCK,
  SELL_STOCK
} from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case GET_PORTFOLIO: 
    case BUY_STOCK:
    case SELL_STOCK:
      return { ...action.payload.portfolio }
    default:
      return state
  }
}