import React from 'react'
import '../App.css';

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
            <div className="center">
                <br />
                <h3>Log In:</h3>
                <form className="ui small form" onSubmit={(e) => this.props.submit(e, this.state)}>
                    <input
                        type="text"
                        name="username"
                        onChange={this.addExistingUserToState}
                        placeholder="Username"
                        required
                        className="three wide field"
                    ></input>
                    <br />
                    <input
                        type="password"
                        name="password"
                        onChange={this.addExistingUserToState}
                        placeholder="Password"
                        required
                        className="three wide field"
                    ></input>
                    <br />
                    <br />
                    {/* <input type="submit" value="Submit" /> */}
                    <button type="submit" className="ui teal basic button">Log In</button>
                </form>                 
            </div>
        )
    }
}

export default Account