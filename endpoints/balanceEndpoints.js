const Account = require('../models/account')

module.exports = (app, {accounts}) => {
 
  app.post('/api/balance', async (req, res) => {
    const userId = req.query.userId || req.body.userId
    const amount = req.query.amount || req.body.amount || 0
    const account = Account.getOrCreate(userId, accounts)
    account.addBalance(amount)
    res.send({account: account.dumpJSON()})
  })

  app.put('/api/balance', async (req, res) => {
    const userId = req.query.userId || req.body.userId
    const amount = req.query.amount || req.body.amount || 0  
    const account = Account.getOrCreate(userId, accounts)
    account.removeBalance(amount)
    res.send({account: account.dumpJSON()})
  })

}