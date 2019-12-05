const Account = require('../models/account')
const Portfolio = require('../models/portfolio')

const { getBatchQuotes } = require('../services/alphavantage')

module.exports = (app, {accounts, portfolios}) => {
  
  app.get('/api/portfolio/:userId', async (req, res) => {
    const { userId } = req.params 
    const account = Account.getOrCreate(userId, accounts)
    const portfolio = Portfolio.getOrCreate(userId, portfolios)
    const currentPrices = await getBatchQuotes(portfolio.getSymbols())
    res.send({
      account: account.dumpJSON(),
      portfolio: portfolio.dumpJSON(),
      currentPrices
    })
  })

}
