import React from 'react'
import PromptContainer from './containers/PromptContainer'
import API from './API'


class EntryForm extends React.Component{

    // user_id: this.props.user.id, 

    // handleSubmitEntry = (e) => {
    //     e.preventDefault()
    //     const entry = {
    //         entry: {journal_entry: this.props.entry, mood_id: this.props.selectedMood}
    //     }
    //     API.post("entries", entry)
    //     .then(entry => this.props.addJournalEntry(entry))
    //     .then(data => console.log(data))
    // } 

    // "journal_entry": "asdfghjkl yup",
    // "mood_id": 9,
    // "mood": {
    //   "id": 9,
    //   "name": "Ominous"
    // }

    moodPostFilter = this.props.moods.filter(mood => mood.name == this.props.selectedMood)
    moodName = this.moodPostFilter.filter(mood => mood.name)


    handleSubmitEntry = (e) => {
        e.preventDefault()
             const entry = {
            entry: {journal_entry: this.props.entry, user_id: this.props.userId, mood_id: this.props.selectedMood}
        }
        fetch("http://localhost:3000/entries", {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(entry)
        })
        .then(r => r.json())
        .then(entry => this.props.addJournalEntry(entry))
        // .then(data => console.log(data))
    }

    render(){
        return(
            <div>
                <h1>Whats up in the air today?</h1>
                <form onSubmit={this.handleSubmitEntry}>
                    <textarea type="text" placeholder="Tell us..." 
                    name="entry" 
                    value={this.props.entry}
                    onChange={this.props.handleEntryForm}/>
                    <br />
                    <h1>Could you summarise todays feeling with a word?</h1>
                    {this.props.moods.map((mood, i) => 
                    <div key={i}> 
                        <input type="radio" name="mood" value={mood.id} onClick={this.props.handleSelectedMood} /> 
                        <label htmlFor="mood">{mood.name}</label>
                    </div>
                    )}
                    <button>Save</button>
                    <PromptContainer /> 
                </form>        
                <form onSubmit={(event) => this.props.handleUpdateSubmit(event)}>
                <button>Update</button> 
                </form> 
            </div>
        )
    }
}

export default EntryForm