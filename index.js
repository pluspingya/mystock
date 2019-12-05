const express = require('express')
const bodyParser = require('body-parser')

const dataStore = {
  accounts: {},
  portfolios: {},
}

const app = express()
app.use(bodyParser.json())
app.use(express.static('public')) //TODO: use Nginx to serve client app

require('./endpoints/portfolioEndpoints')(app, dataStore)
require('./endpoints/balanceEndpoints')(app, dataStore)
require('./endpoints/tradingEndpoints')(app, dataStore)
require('./endpoints/quoteEndpoints')(app, dataStore)

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Server is running and listening on port ${port}`)