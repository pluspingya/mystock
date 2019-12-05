const { searchSymbols, getQuote } = require('../services/alphavantage')

module.exports = (app) => {

  app.get('/api/symbol/:keywords', async (req, res) => {
    const { keywords } = req.params    
    const bestMatches = await searchSymbols(keywords)
    res.send({bestMatches})
  })

  app.get('/api/quote/:symbol', async (req, res) => {
    const { symbol } = req.params
    const quote = await getQuote(symbol)
    res.send({quote})
  })
  
}