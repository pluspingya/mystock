import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../actions'

class Quote extends Component {
  componentDidMount() {
    const { symbol } = this.props.match.params
    this.props.getQuote(symbol)
  }

  render () {
    if (!this.props.quote) {
      return null
    }
    
    const symbol = this.props.quote['01. symbol']
    const lastPrice = this.props.quote['05. price']
    const open = this.props.quote['02. open']
    const high = this.props.quote['03. high']
    const low = this.props.quote['04. low']
    const volume = this.props.quote['06. volume']
    const change = this.props.quote['09. change']
    const changePercent = this.props.quote['10. change percent']

    return (
      <div>
        <div className="row">
          <div className="col s4">
            <label>Symbol</label>       
            <div className="title" id="symbol">{symbol}</div>     
          </div>
          <div className="col s4">
            <label>Last Price</label>       
            <div>{lastPrice}</div>
          </div>
          <div className="col s4">
            <label>Today's Change</label>       
            <div>{change} (${changePercent})</div>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <label>Open($)</label>       
            <div>{open}</div>
          </div>
          <div className="col s3">
            <label>High($)</label>       
            <div>{high}</div>
          </div>
          <div className="col s3">
            <label>Low($)</label>       
            <div>{low}</div>
          </div>
          <div className="col s3">
            <label>Volume</label>       
            <div>{volume}</div>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <Link to={`/trade/buy/${symbol}`}>
              <button className="waves-light btn-large btn-buy">BUY</button>
            </Link>
          </div>
          <div className="col s6">
            <Link to={`/trade/sell/${symbol}`}>
              <button className="waves-light btn-large btn-sell">SELL</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quote: state.quote && state.quote.quote
  }
}

export default connect(mapStateToProps, actions)(Quote)