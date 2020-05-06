import React from 'react';
import './App.css';
import AuthContainer from './components/containers/AuthContainer'
// import { Route, withRouter } from "react-router-dom";
import API from './components/API'
import LoggedInMainPage from './components/LoggedInMainPage';
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component{

  state = {
    accountHandling: false,
    user: null,
    moods: [],
  }

  componentDidMount(){
    this.getInitialData()
  }

  getInitialData = () => {
    if(localStorage.token){
      API.get("validate", localStorage.token)
      .then(json => this.signIn(json.user, json.mood, json.token))
    }
  }

//   componentDidMount() {
//     document.body.style.backgroundColor = "green"
// }


  // validateSignIn = () => {

  // }
 
  // showAccountHandling = () => {
  //   this.setState({accountHandling: !this.state.accountHandling})
  // }

  signIn = (user, mood, token, user_id) => {
    this.setState({ user, moods: mood, userId: user_id});
    localStorage.token = token;
    // this.setState({userEntries: this.state.user.entries})
  };

  onLoggedInSubmit = (event, stateData) => {
    event.preventDefault();

    API.post("sign_in", stateData)
    .then(({ user, token, mood, user_id }) => {
      this.signIn(user, mood, token, user_id);
    });
  }

    signOut = () => {
      this.setState({user: null})
      localStorage.removeItem("token")
    }

  createNewAccount = (event, stateData) => {
    event.preventDefault();
    API.post()
  }


  render() {
    const componentToDisplay = this.state.user ? 
    <LoggedInMainPage 
      user={this.state.user}
      moods={this.state.moods}
      signOut={this.signOut}
      userEntries={this.state.userEntries}
      getInitialData={this.getInitialData}
    /> :
    <AuthContainer submit={this.onLoggedInSubmit}/>
   
    return componentToDisplay
  }
}

export default App


//   render(){
//     return(
//       <div>
//         {/* {Object.entries(this.state.user).length === 0 ? <h1>Please log in!</h1> : <h1>{this.state.user.username}, Lets get Journalling!</h1> } */}
//         <Route
//           exact
//           path="/login"
//           component={(props) => (
//             <LogIn {...props} submit={this.onLoggedInSubmit} />
//           )}
//         />
//         <Route 
//           exact 
//           path="/MainPage"
//           render={(props) => <MainPage />}
//         />
//         <Route 
//           exact
//           path="/loggedInMainPage"
//           render={(props) => 
//             <LoggedInMainPage {...props} 
//               mood={this.state.mood}
//               user={this.state.user} 
//               signOut={this.signOut} 
//             />
//           }
//         />
//       </div>
//     )
//   }
// }



