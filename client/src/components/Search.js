import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../actions'

const BOUNCE_TIME = 200

class Search extends Component {
  constructor(props) {
    super(props)

    this.searchSymbolSchedule = null

    this.state = {
      keywords: ''
    }
  }

  render () {
    return (
      <div>
        <div className="nav-wrapper">
          <div className="input-field">
            <input 
              id="search" 
              type="search" 
              value={this.state.keywords} 
              onChange={this.keywordsChanged.bind(this)}
              required />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons" onClick={this.keywordsCleared.bind(this)}>close</i>
          </div>
        </div>
        <ul className="collection with-header">
          {this.renderSymbolHeader()}
          {(this.props.bestMatches || []).map(this.renderSymbolItem.bind(this))}
        </ul>
      </div>
    )
  }

  renderSymbolHeader() {
    if (this.props.bestMatches.length) {
      return (
        <li className="collection-header">
          Best Matches
        </li>
      )
    } 
    return null
  }

  renderSymbolItem(item, index) {
    const symbol = item['1. symbol']
    const name = item['2. name']
    return (
      <Link to={`/quote/${symbol}`} className="collection-item" key={index}>
        <div className="title">{symbol}</div>
        <div>{name}</div>
      </Link>
    )
  }

  keywordsChanged(e) {
    e.preventDefault()
    this.setState({keywords: e.target.value})

    clearTimeout(this.searchSymbolSchedule)
    this.searchSymbolSchedule = setTimeout(this.searchSymbol.bind(this), BOUNCE_TIME)
  }

  async searchSymbol() {
    await this.props.searchSymbol(this.state.keywords)
  }

  keywordsCleared() {
    this.setState({keywords: ''})
    this.props.clearSearch()
  }
}

const mapStateToProps = (state) => {
  return {
    bestMatches: (state.quote && state.quote.bestMatches) || [],
  }
}

export default connect(mapStateToProps, actions)(Search)