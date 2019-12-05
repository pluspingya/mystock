const Decimal = require('decimal.js')

class PortfolioItem {
  constructor(symbol, quantity, price) {
    this.symbol = symbol,
    this.quantity = quantity,
    this.buyPrice = parseFloat(price)
  }

  add(portfolioItem) {
    const thisQuantity = new Decimal(this.quantity)
    const givenQuantity = new Decimal(portfolioItem.quantity)
    const quantitySum = thisQuantity.add(givenQuantity)

    const thisBuyPrice = new Decimal(this.buyPrice)
    const givenBuyPrice = new Decimal(portfolioItem.buyPrice)

    const averageBuyPrice = thisQuantity.div(quantitySum).mul(thisBuyPrice).add(givenQuantity.div(quantitySum).mul(givenBuyPrice))

    this.buyPrice = averageBuyPrice.toNumber()
    this.quantity = quantitySum.toNumber()
  }

  dumpJSON() {
    return {
      symbol: this.symbol,
      quantity: this.quantity,
      buyPrice: this.buyPrice
    }
  }
}

module.exports = PortfolioItem