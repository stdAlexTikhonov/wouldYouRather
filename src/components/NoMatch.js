import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NoMatch extends Component {
  render() {
    const { location, authedUser } = this.props

    if ( authedUser === 'out') {
      return <Redirect to='/login' />
    }
    
    return (
      <div>
          <h3>No match for <code>{location.pathname}</code></h3>
      </div>

  )
  }

}

function mapStateToProps({ authedUser}, { location }) {
  return {
    authedUser,
    location
  }
}

export default connect(mapStateToProps)(NoMatch)