const Decimal = require('decimal.js')

class Account {
  constructor(userId) {
    this.userId = userId
    this.balance = 0
  }

  addBalance(amount) {
    const thisBalance = new Decimal(this.balance)
    const givenAmount = new Decimal(parseFloat(amount) || 0)
    const newBalance = thisBalance.add(givenAmount)
    this.balance = newBalance.toNumber()
  }

  removeBalance(amount) {
    const thisBalance = new Decimal(this.balance)
    const givenAmount = new Decimal(parseFloat(amount) || 0)
    const newBalance = thisBalance.sub(givenAmount)
    this.balance = newBalance.toNumber()    
    if (this.balance < 0) {
      this.balance = 0
    }
  }

  dumpJSON() {
    return {
      userId: this.userId,
      balance: this.balance
    }
  }

  static getOrCreate(userId, accountCollection) {
    if (!accountCollection[userId]) {      
      accountCollection[userId] = new Account(userId)
    }
    return accountCollection[userId]
  }
}

module.exports = Account