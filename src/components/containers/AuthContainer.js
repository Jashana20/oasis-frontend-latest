import React, { Component } from 'react'

import LogIn from '../LogIn'
import SignUp from '../SignUp'

export default class AuthContainer extends Component {

    state = {
        loginForm: true,
    }

    toggleView = () => {
        this.setState({ loginForm: !this.state.loginForm });
    }
    
    render() {
        return <div>
            <h1>OASIS</h1>
            <h3>a moment for your moments</h3>
            <p>Commit to the small task of frequent journalling to track and balance your mood</p>
            {
                this.state.loginForm
                ? <LogIn submit={this.props.submit} />
                : <SignUp />
            }
            <p>Or</p>
            <button onClick={this.toggleView} >
                { this.state.loginForm ? "Sign Up" : "Log In"}
            </button>
        </div>
    }
}
