import React, { Component } from 'react'
import Decimal from 'decimal.js'

export default class AssetValueView extends Component {
  render () {
    return (
      <div className="row">
          <div className="col s6">
            Total Net Value
          </div>
          <div className="col s6">
            ${this.getAssetValue()}
          </div>
        </div>
    )
  }

  getAssetValue() {
    const assetValue = this.props.symbols.reduce((acc, item) => {
      const price = this.props.currentPrices.find(price => price['1. symbol'] === item.symbol)
      const itemQuantity = new Decimal(item.quantity)

      if (price) {
        const currentPrice = new Decimal(price['2. price'])
        acc = acc.add(currentPrice.mul(itemQuantity))
      }else {
        //if the price data couldn't be retrieved, use the buyPrice instead
        const currentPrice = new Decimal(item.buyPrice)
        acc = acc.add(currentPrice.mul(itemQuantity))
      }

      return acc
    }, new Decimal(0))
    return assetValue.toNumber()
  }
}