const axios = require('axios')
const { alphaVantageAPIKey } = require('../config/keys')

const dataProviderURL = 'https://www.alphavantage.co/query'

const searchSymbols = async (keywords) => {
  const res = await axios.get(`${dataProviderURL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${alphaVantageAPIKey}`)
  return res.data.bestMatches
}

const getQuote = async (symbol) => {
  const res = await axios.get(`${dataProviderURL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphaVantageAPIKey}`)  
  return res.data['Global Quote']
}

const getBatchQuotes = async (symbols) => { 
  if (!symbols || !symbols.length) {
    return []
  }
  const res = await axios.get(`${dataProviderURL}?function=BATCH_STOCK_QUOTES&symbols=${symbols.join()}&apikey=${alphaVantageAPIKey}`)
  return res.data['Stock Quotes']
}

module.exports = {
  searchSymbols,
  getQuote,
  getBatchQuotes
}