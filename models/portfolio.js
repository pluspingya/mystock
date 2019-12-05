class Portfolio {
  constructor(userId) {
    this.userId = userId
    this._symbols = []
  }

  add(portfolioItem) {
    const index = this._symbols.findIndex(item => item.symbol === portfolioItem.symbol)
    if (index === -1) {
      this._symbols.push(portfolioItem)
    }else {
      this._symbols[index].add(portfolioItem)
    }
  }

  remove(symbol, quantity) {
    const index = this._symbols.findIndex(item => item.symbol === symbol)
    if (index === -1) {
      return
    }
    this._symbols[index].quantity -= quantity
    if (this._symbols[index].quantity <= 0) {
      this._symbols.splice(index, 1)
    }
  }

  getPortfolioItem(symbol) {
    return this._symbols.find(item => item.symbol === symbol)
  }

  getSymbols() {
    return this._symbols.map(item => { return item.symbol })
  }

  dumpJSON() {
    return {
      userId: this.userId,
      symbols: this._symbols.map(item => item.dumpJSON())
    }
  }

  static getOrCreate(userId, portfolioCollection) {
    if (!portfolioCollection[userId]) {      
      portfolioCollection[userId] = new Portfolio(userId)
    }
    return portfolioCollection[userId]
  }
}

module.exports = Portfolio