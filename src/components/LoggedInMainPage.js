import React from 'react'
import EntryForm from './EntryForm'
import EntryContainer from './containers/EntryContainer'
import MoodChart from './containers/MoodChartContainer'
import NavBar from './NavBar'
import API from './API'

class LoggedInMainPage extends React.Component{

    state = {
        showEntryForm: false,
        showAllEntries: false,
        showMoodCharts: false,
        entry: "",
        selectedMood: "",
        selectedEntry: {},
        userEntries: []
        // selectedEntryId: 0,
    }

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
        this.setState({selectedMood: e.target.value})
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
        .then(this.fetchEntries)
      }

      selectEntryToDelete = (entryToDelete) => {
          this.setState({selectedEntry: entryToDelete})
      }

      deleteEntry = () => {
         fetch(`http://localhost:3000/entries/${this.state.selectedEntry.id}`, {
            method: 'DELETE',
      })
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
                        selectedMood={this.state.selectedMood}
                         />
                    </div>
                    )}
                     {this.state.showMoodCharts && (<MoodChart />) }
                {this.state.showEntryForm ? (
                    <div>
                    <EntryForm 
                    selectedMood={this.state.selectedMood}
                    handleSelectedMood={this.handleSelectedMood}
                    moods={this.props.moods}
                    user={this.props.user}
                    showAllEntries={this.handleShowAllEntries} 
                    entry={this.state.entry}
                    handleEntryForm={this.handleEntryForm}
                    addJournalEntry={this.addJournalEntry}
                    handleUpdateSubmit={this.handleUpdateSubmit}
                    userId={this.props.userId}
                    />
                    </div>
             ) : 
                <button onClick={this.handleShowEntryForm}>Write a new entry</button> }
            </div>
        )
    }
}

export default LoggedInMainPage