import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import NoMatch from './NoMatch'
import Login from './Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props

    console.log('Authed usaer is: ', authedUser)


    return (

         
      <Router>
        <Fragment>
          <LoadingBar />
          {
              
              this.props.loading === true
              ? null
              : (
          <div className='container'>
          { authedUser !== 'out' && <Nav /> }
          <div>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/question/:id' exact component={QuestionPage} />
                  <Route path='/add' exact component={NewQuestion} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
                  <Route path='/login' component={Login} /> 
                  <Route component={NoMatch} />
                </Switch>
              </div>
            
          </div>)
        }
          </Fragment>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)