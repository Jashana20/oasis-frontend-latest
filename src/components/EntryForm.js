import React from 'react'
import PromptContainer from './containers/PromptContainer'
// import API from './API'
import './NavBar.css'
import '../App.css';


class EntryForm extends React.Component{

    handleSubmitEntry = (e) => {
        e.preventDefault()
             const entry = {
            entry: {journal_entry: this.props.entry, user_id: this.props.user.id, mood_id: this.props.selectedMood}
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
                <form onSubmit={this.handleSubmitEntry} >
                    <textarea className="ui massive form" type="text" placeholder="Tell us..." 
                    name="entry" 
                    value={this.props.entry}
                    onChange={this.props.handleEntryForm}/>
                    <br />
                    <h1>Could you summarise todays feeling with a word?</h1>
                    {this.props.moods.map((mood, i) => 
                    <div key={i}> 
                        <input type="radio" name="mood" value={mood.id} onClick={this.props.handleSelectedMood} /> 
                        <label className="font" htmlFor="mood">{mood.name}</label>
                    </div>
                    )}
                    <br />
                    <button className="ui teal basic button">Save</button>
                </form>        
                <form onSubmit={(event) => this.props.handleUpdateSubmit(event)}>
                <button className="ui teal basic button">Update</button> 
                </form> 
                <PromptContainer prompts={this.props.prompts}/> 
            </div>
        )
    }
}

export default EntryForm