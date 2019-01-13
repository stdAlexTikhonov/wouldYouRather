import React, { Component } from 'react'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Login extends Component {
    state = {
        text1: '',
        text2: ''
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
        const { users } = this.props

        let user = users[text1]

        const { dispatch } = this.props

        if (user.password === text2) {
            dispatch(setAuthedUser(text1))
            this.setState(() => ({
                text1: '',
                text2: ''
            }))
        }


    }
    render() {
        const { authedUser } = this.props
        const { text1, text2 } = this.state
        
        if (authedUser !== 'out') {
            return <Redirect to='/' />
        }
        
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <input type='text' onChange={this.handleChange1} value={text1} placeholder="Enter your id" />
                    <input type='password' onChange={this.handleChange2} value={text2} placeholder="Enter your password" />
                    <input type="submit" className="btn" value="login" />
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {

    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Login)