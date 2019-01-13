import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { formatQuestion } from '../utils/helper'
import { handleSetAnswer } from '../actions/questions'
import { Link } from 'react-router-dom'

class Question extends Component {
    handleClick = (e, option) => {
        e.preventDefault()
        const { dispatch, question, authedUser } = this.props
        dispatch(handleSetAnswer({
            id: question.id,
            authedUser,
            option
        }))
        
    }
    
    render() {
        const { question, authedUser, id, users } = this.props,
            selectedOne = question['optionOne'].votes.includes(authedUser),
            selectedTwo = question['optionTwo'].votes.includes(authedUser),
            user = users[question.author]
        return(
            <Link to={`/question/${id}`} className="question">
                {(selectedTwo || selectedOne) && <img src={user.avatarURL} alt={user.name} />}
                <div onClick={!selectedOne && !selectedTwo ? (e) => this.handleClick(e, 'optionOne') : null } style={{ backgroundColor: selectedOne ? 'lightgreen' : 'none'}} className="question-text">{question['optionOne'].text}</div>
                <div onClick={!selectedOne && !selectedTwo ? (e) => this.handleClick(e, 'optionTwo') : null } style={{ backgroundColor: selectedTwo ? 'lightgreen' : 'none'}}  className="question-text">{question['optionTwo'].text}</div>
            </Link>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
    const question = questions[id]
    return {
        authedUser,
        question,
        users
        // question: formatQuestion(question['optionOne'].text, question['optionTwo'].text, question.author)
    }
}

export default connect(mapStateToProps)(Question)