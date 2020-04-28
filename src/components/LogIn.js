import React from 'react'
import LoggedInMainPage from './LoggedInMainPage'
import API from './API'

class Account extends React.Component{

    state = {
        username: null,
        password: null,
    }

    handleLogIn = () => {
        this.setState({loggedIn: !this.state.loggedIn})
    }

    addExistingUserToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render(){
        return(
            <>
                <h3>Log In:</h3>
                <form onSubmit={(e) => this.props.submit(e, this.state)}>
                    <input
                        type="text"
                        name="username"
                        onChange={this.addExistingUserToState}
                        placeholder="Username"
                        required
                    ></input>
                    <br />
                    <input
                        type="password"
                        name="password"
                        onChange={this.addExistingUserToState}
                        placeholder="Password"
                        required
                    ></input>
                    <br />
                    <input type="submit" value="Submit" />
                </form>                 
            </>
        )
    }
}

export default Account