import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserCard from './UserCard'

class Leaderboard extends Component {
    render() {
        const { users, authedUser } = this.props,
            usersIds = Object.keys(users)
       
            usersIds.sort((a,b) => {
                
                let answers1 = Object.keys(users[a].answers).length,
                    questions1 = users[a].questions.length,
                    answers2 = Object.keys(users[b].answers).length,
                    questions2 = users[b].questions.length
    
                return (answers2 + questions2) - (answers1 + questions1)
            });

        if (authedUser === 'out') {
            return <Redirect to='/login' />
        }

        return (
            <Fragment>
                <h2>Leaderboard</h2>
                {
                    usersIds.map(userId => (
                        <UserCard key={userId} id={userId} />
                    ))
                }
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        users,authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)