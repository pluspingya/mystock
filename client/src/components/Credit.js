import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from '../actions'

import BalanceView from './BalanceView'

class Credit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0
    }
  }

  render() {
    return (
      <div>
        <BalanceView balance={this.props.balance} />
        <hr />
        <div className="row">
          <div className="col s6">
            Amount
          </div>
          <div className="col s6">
            <input type="text" 
                value={this.state.amount} 
                onChange={this.changeAmount.bind(this)}
                onBlur={this.correctAmount.bind(this)} /> 
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <button 
              className="waves-effect waves-light btn btn-buy"
              onClick={this.addBalance.bind(this)}>
              Add
            </button>
          </div>
          <div className="col s6">
            <button 
              className="waves-effect waves-light btn btn-sell"
              onClick={this.removeBalance.bind(this)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  }

  changeAmount(e) {
    e.preventDefault()
    const amount = e.target.value
    this.setState({amount})
  }

  correctAmount(e) {
    e.preventDefault()
    const amount = parseFloat(this.state.amount) || 0.0
    this.setState({amount})
  }

  addBalance(e) {
    e.preventDefault()    
    if (this.state.amount <= 0) {
      return
    }
    this.props.addBalance({amount: this.state.amount})    
    this.setState({amount: 0})
  }

  removeBalance(e) {
    e.preventDefault()
    this.props.removeBalance({amount: this.state.amount})
    this.setState({amount: 0})
  }
}

const mapStateToProps = (state) => {
  return {
    balance: (state.account && state.account.balance) || 0
  }
}

export default connect(mapStateToProps, actions)(Credit)