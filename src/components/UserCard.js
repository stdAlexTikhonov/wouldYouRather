import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserCard extends Component {
    
    render() {
        const { user }  = this.props,
            answers = Object.keys(user.answers).length,
            questions = user.questions.length 
        return (
            <div className="user-card">
                <div>
                    <img src={user.avatarURL} alt={user.name} />
                    <p>{user.name}</p>
                </div>
                <div>Total questions: {questions}</div>
                <div>Total answers: {answers}</div>
            </div>
        )
    }
}

function mapStateToProps({ users }, { id }) {
    const user = users[id]
    return {
        user
    }
}

export default connect(mapStateToProps)(UserCard)