import React, { Component } from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import '../NavBar'

export default class AuthContainer extends Component {

    state = {
        loginForm: true,
    }

    toggleView = () => {
        this.setState({ loginForm: !this.state.loginForm });
    }
    
    render() {
        return <div className="center">
            <h1><i class="leaf icon"></i>OASIS</h1>
            <h3>A moment for your moments</h3>
            <p>Commit to the small task of frequent journalling to track and balance your mood</p>
            <div className="ui buttons">
            <button onClick={this.toggleView} className="ui teal basic button">Sign Up</button>
            <button onClick={this.toggleView} className="ui teal basic button">Log In</button>
            </div>
            <br />
            {
                this.state.loginForm
                ? <LogIn submit={this.props.submit} />
                : <SignUp />
            }
            <image src="/image/Analytics.jpg" alt="main page image"/>
        </div>
    }
}
