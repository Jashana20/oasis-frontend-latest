import React from 'react'
import EntryForm from './EntryForm'
import EntryContainer from './containers/EntryContainer'
import MoodChart from './containers/MoodChartContainer'
import NavBar from './NavBar'
import Affirmations from '../affirmation'
import '../App.css';
// import API from './API'

const BASE_URL = "http://localhost:3000"

class LoggedInMainPage extends React.Component{

    state = {
        showEntryForm: false,
        showAllEntries: false,
        showMoodCharts: false,
        showCorrectPage: false,
        entry: "",
        affirmation: "",
        selectedMoodId: null,
        selectedMoodObj: {},
        selectedEntry: {},
        userEntries: [],
        prompts: [],
        deleteConfirm: false
        // selectedEntryId: 0,
    }


    componentDidMount(){
        this.fetchData()
        this.randomAffirmation()
  }

   fetchData = () => {
    fetch(BASE_URL + '/questions')
    .then(res => res.json())
    .then(q => this.setState({prompts: q}))
    // .then(this.randomAffirmation)
    .then(this.setState({userEntries: this.props.user.entries}))
   }

   randomAffirmation = () => {
    const random = Affirmations[Math.floor(Math.random()*Affirmations.length)];
    // return random
    this.setState({affirmation: random})
   } 
   
   handleDeleteConfirm = () => {
       this.setState({deleteConfirm: !this.state.deleteConfirm})
   }

    addJournalEntry = (entry) => { 
        // this.props.getInitialData()
        this.setState({ 
            userEntries: this.state.userEntries.push(entry),
            entry: "" 
        }) 
    }  

    handleShowEntryForm = () => {
        this.setState({
            showEntryForm: !this.state.showEntryForm,
            showMoodCharts: false,
            showAllEntries: false
        })
    }

    handleShowAllEntries = () => {
        this.setState({
            showAllEntries: true,
            userEntries: this.props.user.entries,
            selectedMoodId: "All",
            showMoodCharts: false,
            showEntryForm: false
        })
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
        this.setState({
            showMoodCharts: true,
            showAllEntries: false
        })
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
        // .then(res => res.json())
        .then(this.handleUpdate())
      }

      handleUpdate = () => {
        this.props.getInitialData()
        this.setState({
            userEntries: this.props.user.entries,
            entry: ""
        })
      }

      selectEntryToDelete = (entryToDelete) => {
          this.setState({selectedEntry: entryToDelete})
          this.handleDeleteConfirm()
      }

      deleteEntry = () => {
        //   e.preventDefault()
         fetch(`http://localhost:3000/entries/${this.state.selectedEntry.id}`, {
            method: 'DELETE',
      })
      .then(this.handleDelete())
    }

    handleDelete = () => {
        this.props.getInitialData()
        this.setState({ userEntries: this.props.user.entries })
    }

    render(){
       return(
            <div>
                 <NavBar 
                    signOut={this.props.signOut}
                    handleShowAllEntries={this.handleShowAllEntries}
                    handleShowMoodCharts={this.handleShowMoodCharts} />
                    {this.props.user && <h1 className="border">{this.props.user.username}, lets get journaling!</h1>}
                <div className="center">
                <h2>"{this.state.affirmation}"</h2> 
                <button className="ui teal basic button" onClick={this.handleShowEntryForm}>
                    {this.state.showEntryForm ? "Maybe later" : "Start writing"}
                </button> 
                <br />
                <br />
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
                     <br />
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
            </div>
        )
    }
}

export default LoggedInMainPage