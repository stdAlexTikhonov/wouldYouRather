import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        text1: '',
        text2: '',
        toHome: false
    }
    handleChange1 = (e) => {
        const text1 = e.target.value

        this.setState(() => ({
            text1
        }))
    }
    handleChange2 = (e) => {
        const text2 = e.target.value

        this.setState(() => ({
            text2
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { text1, text2 } = this.state

        const { dispatch } = this.props

        dispatch(handleAddQuestion(text1, text2))

        this.setState(() => ({
            text1: '',
            text2: '',
            toHome: true
        }))
    }
    render() {
        const { text1, text2, toHome } = this.state
        const { authedUser } = this.props

        if (authedUser === 'out') {
            return <Redirect to='/login' />
        }

        if (toHome) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h2>Would you rather</h2>
                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange1} value={text1} placeholder="Enter option one" />
                    <textarea onChange={this.handleChange2} value={text2} placeholder="Enter option two" />
                    <button className="btn" type="submit" disabled={ (text1 === '') || (text2 === '')}>
                        submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)