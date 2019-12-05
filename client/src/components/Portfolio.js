import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import BalanceView from './BalanceView'
import AssetValueView from './AssetValueView'

class Portfolio extends Component {
  render () {
    return (
      <div>
        <BalanceView balance={this.props.balance} />        
        <AssetValueView symbols={this.props.symbols} currentPrices={this.props.currentPrices} />
        <hr />
        <div className="row">
          <div className="col s3">
            Symbol
          </div>
          <div className="col s3">
            Quantity
          </div>
          <div className="col s3">
            Buy Price
          </div> 
          <div className="col s3">
            Current Price
          </div>        
        </div>
        <hr />
        {this.props.symbols.map(this.renderSymbolItem.bind(this))}
      </div>
    )
  }

  renderSymbolItem(item, index) {
    const currentPrice = this.props.currentPrices.find(price => price['1. symbol'] === item.symbol)

    return (
      <Link to={`/quote/${item.symbol}`} key={index}>
        <div className="row">
          <div className="col s3">
            {item.symbol}
          </div>
          <div className="col s3">
            {item.quantity}
          </div>
          <div className="col s3">
            {item.buyPrice}
          </div>        
          <div className="col s3">
            {currentPrice && currentPrice['2. price']}
          </div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    balance: (state.account && state.account.balance) || 0,
    symbols: (state.portfolio && state.portfolio.symbols) || [],
    currentPrices: (state.quote && state.quote.currentPrices) || []
  }
}

export default connect(mapStateToProps, {})(Portfolio)