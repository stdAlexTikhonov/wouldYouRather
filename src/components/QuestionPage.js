import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {
    render() {
        const { id, question, user, authedUser, users } = this.props

        let totalUsers = Object.keys(users).length
    if (!question)  { 
        return <Redirect to='/udefinedQuestionId'  /> 
    }

        const count1 = question['optionOne'].votes.length,
            count2 = question['optionTwo'].votes.length

        const isAnswered = Object.keys(user.answers).includes(id)
        
        if (authedUser === 'out') {
            return <Redirect to='/login' />
        }
        
        return(
            <div>
                <div>
                    <img src={user.avatarURL} alt={user.name} />
                </div>
                <h2>Would you rather</h2>
                <Question id={id} />
                { isAnswered && (<ul className="info">
                                    <li className="legend">Your choice is: '{ question[user.answers[id]].text }'</li>
                                    <li className="result">Option 1 was choosen by {parseInt(count1/totalUsers*100)}% of users</li>
                                    <li className="result">Option 2 was choosen by {parseInt(count2/totalUsers*100)}% of users</li>
                                </ul>) }
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const { id } = props.match.params
    const question = questions[id]
    const user = users[authedUser]
    return {
        id,
        question,
        user,
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(QuestionPage)