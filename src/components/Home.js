import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class Home extends Component {
    state =  {
        answeredFlag: false
    }
    handleClick = () => {
        this.setState(prev => {
            return { answeredFlag: !prev.answeredFlag }
        })
    }
    render() {
        let { questionIds, answers, authedUser } = this.props,
            unanswered = questionIds.filter(id => !Boolean(answers[id])),
            answered = questionIds.filter(id => Boolean(answers[id]))
        
        if (authedUser === 'out') {
            return <Redirect to='/login' />
        }

        return (
            <div className="homeContainer">
                <button className="homeBtn" onClick={() => this.handleClick()}>{this.state.answeredFlag ? 'Go to New Questions' : 'Go to Old Questions'}</button>
                {
                    this.state.answeredFlag
                    ?
                    answered.map(id => {
                        return <Question key={id} id={id} />
                    })
                    :
                    unanswered.map(id => {
                        return <Question key={id} id={id} />
                    })
                }
                
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}) {
    
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        answers: authedUser !== 'out' ? users[authedUser].answers : [],
        authedUser
    }
}

export default connect(mapStateToProps)(Home)