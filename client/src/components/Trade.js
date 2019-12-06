import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from '../actions'

const ORDER_BUY = 'BUY'
const ORDER_SELL = 'SELL'

class Trade extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 0,
      message: 'Please specify quantity'
    }
  }

  componentDidMount() {
    if (!this.props.quote) {
      const { symbol } = this.props.match.params
      this.props.getQuote(symbol)
    }
  }

  render () {
    if (!this.props.quote) {
      //TODO: show loading icon
      return null
    }

    const symbol = this.getCurrentSymbol()
    const lastPrice = this.props.quote['05. price']
    const change = this.props.quote['09. change']
    const changePercent = this.props.quote['10. change percent']

    return (
      <div>
        <div className="row">
          <div className="col s6">
            Cash Balance
          </div>
          <div className="col s6">
            ${this.props.balance}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col s6">
            Order type
          </div>
          <div className="col s6">
            {this.getOrderType()}
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            Symbol
          </div>
          <div className="col s6">
            <span className="title">{symbol}</span>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label>Last Price</label>       
            <div>{lastPrice}</div>
          </div>
          <div className="col s6">
            <label>Today's Change</label>       
            <div>${change} ({changePercent})</div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col s6">
            Quantity
          </div>
          <div className="col s6">
            <input type="text" 
              value={this.state.quantity} 
              onChange={this.quantityChanged.bind(this)} />          
          </div>
        </div>
        <div className="row">          
          {this.renderSubmitButton(symbol)}
        </div>
      </div>
    )
  }

  getOrderType() {
    return this.props.match.params.action === 'sell' ? ORDER_SELL : ORDER_BUY
  }

  getCurrentSymbol() {
    return this.props.quote && this.props.quote['01. symbol']
  }

  renderSubmitButton(symbol) {
    if (this.state.message) {
      return (
        <div className="col s12 center message">
          {this.state.message}
        </div>
      )
    }
    return (
      <div className="col s12">
        <button 
          className="waves-effect waves-light btn-large btn-submit"
          onClick={e => this.submitOrder(e, symbol)}>
          Submit order
        </button>
      </div>
    )
  }

  quantityChanged(e) {
    e.preventDefault()
    const quantity = parseInt(e.target.value) || 0      
    this.setState({quantity, message: this.getMessage(quantity)})
  }

  getMessage(quantity) {
    let message = ''
    switch (this.getOrderType()) {
      default:
      case ORDER_BUY: 
        if (this.props.balance <= 0) {
          message = 'Please add your cash balance'
        }else if (quantity <= 0) {
          message = 'Please specify quantity'
        }else {
          const lastPrice = this.props.quote['05. price']
          const total = quantity * lastPrice
          if (this.props.balance < total) {
            message = 'Your cash balance is insufficient!'
          }
        }
      break
      case ORDER_SELL: 
        if (quantity <= 0) {
          message = 'Please specify quantity'
        }else {
          const symbol = this.getCurrentSymbol()
          const existingQuantity = this.props.symbols.reduce((acc, item) => {
            if (item.symbol === symbol) {
              acc = acc + item.quantity            
            }
            return acc
          }, 0)
          if (quantity > existingQuantity) {
            message = 'Inadequate number of shares to sell'
          }
        }
      break
    }
    return message
  }

  async submitOrder(e, symbol) {
    e.preventDefault()
    const params = {
      symbol,
      quantity: this.state.quantity
    }
    
    this.setState({message: 'submitting order ...'})
    switch(this.getOrderType()) {
      default:
      case ORDER_BUY:
        await this.props.buyStock(params)
        break
      case ORDER_SELL:
        await this.props.sellStock(params)
        break
    }

    // window.location = '/portfolio'
    this.props.history.push('/portfolio')
  }
}

const mapStateToProps = (state) => {
  return {
    quote: state.quote && state.quote.quote,
    balance: (state.account && state.account.balance) || 0,
    symbols: (state.portfolio && state.portfolio.symbols) || []
  }
}

export default connect(mapStateToProps, actions)(Trade)