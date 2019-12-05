import { combineReducers } from 'redux'

import account from './accountReducer'
import portfolio from './portfolioReducer'
import quote from './quoteReducer'

export default combineReducers({
  account, portfolio, quote
})