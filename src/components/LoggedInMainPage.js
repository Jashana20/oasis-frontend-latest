import React from 'react'
import EntryForm from './EntryForm'
import EntryContainer from './containers/EntryContainer'
import MoodChart from './containers/MoodChartContainer'
import NavBar from './NavBar'
import Affirmations from '../affirmation'
// import API from './API'

const BASE_URL = "http://localhost:3000"

class LoggedInMainPage extends React.Component{

    state = {
        showEntryForm: false,
        showAllEntries: false,
        showMoodCharts: false,
        entry: "",
        affirmation: "",
        selectedMoodId: "",
        selectedMoodObj: {},
        selectedEntry: {},
        userEntries: [],
        prompts: []
        // selectedEntryId: 0,
    }


    componentDidMount(){
    fetch(BASE_URL + '/questions')
    .then(res => res.json())
    .then(q => this.setState({prompts: q}))
    .then(this.randomAffirmation)
  }

   randomAffirmation = () => {
    const random = Affirmations[Math.floor(Math.random()*Affirmations.length)];
    // return random
    this.setState({affirmation: random})
   } 

//    handleAffirmation = () => {
//        this.setState({affirmation: !this.state.affirmation})
//    }

    // selectedEntry = () => {
    //     return this.state.userEntries.find( e => e.id == this.state.selectedEntryId )
    // }

    // componentDidMount(){
    //     if(!localStorage.token){
    //         this.props.history.push("/MainPage")
    //     } 
    // }

    // componentDidMount(){
    //     this.setState({userEntries: this.props.user.entries})
    // }

    addJournalEntry = (entry) => { 
        this.setState({ 
            userEntries: [...this.state.userEntries, entry], 
            entry: "" 
        }) 
    }  

    handleShowEntryForm = () => {
        this.setState({showEntryForm: !this.state.showEntryForm})
    }

    handleShowAllEntries = () => {
        this.setState({showAllEntries: !this.state.showAllEntries})
        this.setState({userEntries: this.props.user.entries})
    }

    handleEntryForm = (e) => {
        this.setState({entry: e.target.value})
    }

    handleSelectedMood = (e) => {
        const moodObj = this.props.moods.filter(mood => mood.id == e.target.value)
        this.setState({
            selectedMoodId: e.target.value,
            selectedMoodObj: moodObj})
    }

    handleShowMoodCharts = () => {
        this.setState({showMoodCharts: !this.state.showMoodCharts})
    }

    populateEntryForm = (selectedEntry) => {
        this.setState({
            entry: selectedEntry.journal_entry,
            selectedMood: selectedEntry.mood_id,
            selectedEntry: selectedEntry
        })
    }

    // .mood_id

    handleUpdateSubmit = (event) => {
        event.preventDefault()
        const entryUpdate = {
                journal_entry: this.state.entry,
        }
        fetch(`http://localhost:3000/entries/${this.state.selectedEntry.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json',
            'accept':'application/json'
          },
          body: JSON.stringify(entryUpdate)
        })
        .then(res => res.json())
        // .then(this.setState({userEntries: this.props.user.entries}))
      }

      selectEntryToDelete = (entryToDelete) => {
          this.setState({selectedEntry: entryToDelete})
      }

      deleteEntry = (e) => {
          e.preventDefault()
         fetch(`http://localhost:3000/entries/${this.state.selectedEntry.id}`, {
            method: 'DELETE',
      })
    //   .then(res => res.json())
    }
  
    render(){
       return(
            // <Router>
            //     <Switch>
            //         <Route />
            //         <Route />
            //         <Route />
            //         <Route />
            //         <Route />
            //     </Switch>
            // </Router>
            <div>
                 <NavBar 
                    signOut={this.props.signOut}
                    handleShowAllEntries={this.handleShowAllEntries}
                    handleShowMoodCharts={this.handleShowMoodCharts} />
                    {this.props.user && <h1>{this.props.user.username}, lets get journalling!</h1>}
                  <h3>{this.state.affirmation}</h3> 
                {this.state.showAllEntries && (
                    <div>
                        <EntryContainer 
                        user={this.props.user}
                        entries={this.state.userEntries}
                        populateEntryForm={this.populateEntryForm}
                        selectEntryToDelete={this.selectEntryToDelete}
                        deleteEntry={this.deleteEntry}
                        moods={this.props.moods}
                        handleSelectedMood={this.handleSelectedMood}
                        selectedMood={this.state.selectedMoodId}
                         />
                    </div>
                    )}
                     {this.state.showMoodCharts && (<MoodChart user={this.props.user} moods={this.props.moods} />) }
                     <button onClick={this.handleShowEntryForm}>
                    {this.state.showEntryForm ? "Maybe later" : "Start writing"}
                    </button> 
                {this.state.showEntryForm && (
                    <div>
                    <EntryForm 
                    selectedMood={this.state.selectedMoodId}
                    handleSelectedMood={this.handleSelectedMood}
                    moods={this.props.moods}
                    user={this.props.user}
                    showAllEntries={this.handleShowAllEntries} 
                    entry={this.state.entry}
                    handleEntryForm={this.handleEntryForm}
                    addJournalEntry={this.addJournalEntry}
                    handleUpdateSubmit={this.handleUpdateSubmit}
                    userId={this.props.userId}
                    prompts={this.state.prompts}
                    selectedMoodObj={this.state.selectedMoodObj}
                    />
                    </div>
             )} 
            </div>
        )
    }
}

export default LoggedInMainPage