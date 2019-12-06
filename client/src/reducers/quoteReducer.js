import {
  GET_PORTFOLIO,
  SEARCH_SYMBOL,
  CLEAR_SEARCH,
  GET_QUOTE,
  BUY_STOCK,
  SELL_STOCK
} from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case GET_PORTFOLIO: {
      return {
        currentPrices: action.payload.currentPrices
      }
    }
    case SEARCH_SYMBOL: {
      return {
        bestMatches: action.payload.bestMatches
      }
    }
    case CLEAR_SEARCH: {
      return {
        bestMatches: []
      }
    }
    case GET_QUOTE:
    case BUY_STOCK:
    case SELL_STOCK: {
      const quote = action.payload.quote || (state && state.quote)
      const currentPrices = action.payload.currentPrices || (state && state.currentPrices)
      return { ...state, quote, currentPrices }
    }
    default:
      return state
  }
}