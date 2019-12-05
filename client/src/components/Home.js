import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../actions'

import M from 'materialize-css'

import Portfolio from './Portfolio'
import Search from './Search'
import Quote from './Quote'
import Trade from './Trade'
import Credit from './Credit'

class Home extends Component {

  constructor(props) {
    super(props)

    this.sideNavRef = React.createRef()
    this.sideNavInstance = null
  }

  componentDidMount() {
    this.sideNavInstance = M.Sidenav.init(this.sideNavRef.current)
    this.props.getPortfolio()
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <div className="nav-wrapper">
              <button data-target="slide-out" className="left sidenav-trigger btn-flat">
                <i className="material-icons">menu</i>
              </button>
              <Link to="/" className="brand-logo">MyStock</Link>
            </div>
          </nav>
          <ul id="slide-out" className="sidenav" ref={this.sideNavRef}>          
            <li>
              <Link to="/portfolio" onClick={this.closeSidenav.bind(this)}>
                <i className="material-icons">pie_chart</i>
                Portfolio
              </Link>
              <Link to="/search" onClick={this.closeSidenav.bind(this)}>
                <i className="material-icons">search</i>
                Get a Quote
              </Link>
              <Link to="/credit" onClick={this.closeSidenav.bind(this)}>
                <i className="material-icons">money</i>
                Credit
              </Link>              
            </li>
          </ul>        
          <div>
            <Switch>
              <Route path="/" exact component={Portfolio} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/search" component={Search} />
              <Route path="/quote/:symbol" component={Quote} />
              <Route path="/trade/:action/:symbol" component={Trade} />
              <Route path="/credit" component={Credit} />
            </Switch>
          </div>
        </BrowserRouter>        
      </div>
    )
  }

  closeSidenav() {
    this.sideNavInstance.close()
  }

}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    portfolio: state.portfolio
  }
}

export default connect(mapStateToProps, actions)(Home)