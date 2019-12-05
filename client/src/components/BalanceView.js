import React, { Component } from 'react'

export default class BalanceView extends Component {
  render () {
    return (
      <div className="row">
          <div className="col s6">
            Cash Balance
          </div>
          <div className="col s6">
            ${this.props.balance}
          </div>
        </div>
    )
  }
}