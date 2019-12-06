const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const dataStore = {
  accounts: {},
  portfolios: {},
}

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))

require('./endpoints/portfolioEndpoints')(app, dataStore)
require('./endpoints/balanceEndpoints')(app, dataStore)
require('./endpoints/tradingEndpoints')(app, dataStore)
require('./endpoints/quoteEndpoints')(app, dataStore)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`MyStock app is listening on port ${port}`)