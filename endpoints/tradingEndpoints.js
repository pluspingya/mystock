const Account = require('../models/account')
const Portfolio = require('../models/portfolio')
const PortfolioItem = require('../models/portfolioItem')

const { getQuote } = require('../services/alphavantage')

const getParameters = (req) => {
  return {
    userId: req.query.userId || req.body.userId,
    symbol: req.query.symbol || req.body.symbol,
    quantity: req.query.quantity || req.body.quantity
  }
}

module.exports = (app, {accounts, portfolios}) => {

  app.post('/api/buy', async (req, res) => {
    const { userId, symbol, quantity } = getParameters(req)
    
    const quote = await getQuote(symbol)
    if (!quote) {
      res.send({error: 'Internal error, please try again later!'})
      return
    }

    const account = Account.getOrCreate(userId, accounts)
    const lastPrice = quote['05. price']
    const totalBuyPrice = lastPrice * quantity

    if (account.balance < totalBuyPrice) {
      res.send({error: 'Insufficient balance!', quote })
      return
    }

    account.removeBalance(totalBuyPrice)

    const portfolio = Portfolio.getOrCreate(userId, portfolios)
    portfolio.add(new PortfolioItem(symbol, quantity, lastPrice))

    res.send({
      account: account.dumpJSON(),
      portfolio: portfolio.dumpJSON()
    })
  })

  app.post('/api/sell', async (req, res) => {
    const { userId, symbol, quantity } = getParameters(req)

    const quote = await getQuote(symbol)
    if (!quote) {
      res.send({error: 'Internal error, please try again later!'})
      return
    }

    const account = Account.getOrCreate(userId, accounts)
    const lastPrice = quote['05. price']
    const totalSellPrice = lastPrice * quantity

    const portfolio = Portfolio.getOrCreate(userId, portfolios)
    const portfolioItem = portfolio.getPortfolioItem(symbol)
    if (!portfolioItem) {
      res.send({
        error: 'You do not own a given stock!', 
        quote,
        portfolio: portfolio.dumpJSON()
      })
      return
    }

    if (portfolioItem.quantity < quantity) {
      res.send({
        error: 'Inadequate number of stocks!', 
        quote,
        portfolio: portfolio.dumpJSON()
      })
      return
    }

    account.addBalance(totalSellPrice)
    portfolio.remove(symbol, quantity)

    res.send({
      account: account.dumpJSON(),
      portfolio: portfolio.dumpJSON()
    })
  })
  
}