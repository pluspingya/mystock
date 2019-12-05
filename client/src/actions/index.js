import axios from 'axios'

import {
  GET_PORTFOLIO,
  ADD_BALANCE,
  REMOVE_BALANCE,
  BUY_STOCK,
  SELL_STOCK,
  SEARCH_SYMBOL,
  CLEAR_SEARCH,
  GET_QUOTE
} from './types'

export const getPortfolio = (userId) => async dispatch => {
  const res = await axios.get(`/api/portfolio/${userId}`)
  dispatch({type: GET_PORTFOLIO, payload: res.data})
}

export const addBalance = ({userId, amount}) => async dispatch => {
  const params = { userId, amount }
  const res = await axios.post(`/api/balance`, params)
  dispatch({type: ADD_BALANCE, payload: res.data})
}

export const removeBalance = ({userId, amount}) => async dispatch => {
  const params = { userId, amount }
  const res = await axios.put(`/api/balance`, params)
  dispatch({type: REMOVE_BALANCE, payload: res.data})
}

export const buyStock = ({userId, symbol, quantity}) => async dispatch => {
  const params = { userId, symbol, quantity }
  const res = await axios.post(`/api/buy`, params)
  dispatch({type: BUY_STOCK, payload: res.data})
}

export const sellStock = ({userId, symbol, quantity}) => async dispatch => {
  const params = {userId, symbol, quantity}
  const res = await axios.post('/api/sell', params)
  dispatch({type: SELL_STOCK, payload: res.data})
}

export const searchSymbol = (keywords) => async dispatch => {
  const res = await axios.get(`/api/symbol/${keywords}`)
  dispatch({type: SEARCH_SYMBOL, payload: res.data})
}

export const clearSearch = () => async dispatch => {
  dispatch({type: CLEAR_SEARCH})
}

export const getQuote = (symbol) => async dispatch => {
  const res = await axios.get(`/api/quote/${symbol}`)
  dispatch({type: GET_QUOTE, payload: res.data})
}