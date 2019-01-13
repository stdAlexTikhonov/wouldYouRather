import React, { Component } from 'react'
import { resetAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  handleClick = () => {
    const { dispatch } = this.props
    dispatch(resetAuthedUser())
  }

  render () {
    const { user } = this.props

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            Hello: {user.name} <span className="logout" onClick={this.handleClick}>Logout</span>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ authedUser, users}) {
  const user = users[authedUser]
  return {
    user
  }
}

export default connect(mapStateToProps)(Nav)