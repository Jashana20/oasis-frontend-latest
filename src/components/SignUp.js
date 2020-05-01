import React from 'react'
import '../App.css';

class SignUp extends React.Component {

    state = {
        username: "",
        email: "",
        password: ""
    }

    handleSignUpInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    createNewUser = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/index", {
            method: 'POST',
            headers: 
             {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                }
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    render(){
        return(
            <div className="center">
                <br />
                <h3>Sign Up:</h3>
                <form className="ui small form" onSubmit={this.createNewUser}>
                    <input 
                    placeholder="Username" 
                    name="username" required
                    onChange={this.handleSignUpInput}
                    className="three wide field"></input>
                    <br />
                    <input 
                    placeholder="Email" 
                    name="email" required
                    onChange={this.handleSignUpInput}
                    className="three wide field"></input>
                    <br />
                    <input 
                    placeholder="Password" 
                    name="password" required
                    onChange={this.handleSignUpInput}
                    className="three wide field"></input>
                    <br />
                    <br />
                    <button type="submit" className="ui teal basic button">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp