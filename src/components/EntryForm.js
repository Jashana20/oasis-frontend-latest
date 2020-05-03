import React from 'react'
import PromptContainer from './containers/PromptContainer'
// import API from './API'
import './NavBar.css'
import '../App.css';


class EntryForm extends React.Component{

    state = {
        showPrompts: false
    }

    handleShowPrompts = () => {
        this.setState({showPrompts: !this.state.showPrompts})
    }

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
            <div className="ui horizontal segments">
                <div className="ui left aligned segment">
                <h1>Whats up in the air today?</h1>
                <form onSubmit={this.handleSubmitEntry}>
                    <textarea className="ui massive form" type="text" placeholder="Tell us..." 
                    name="entry" 
                    value={this.props.entry}
                    onChange={this.props.handleEntryForm}/>
                    <br />
                    <h1>Could you summarise todays feeling with a word?</h1>
                    <br />
                    {this.props.moods.map((mood, i) => 
                    <div key={i}> 
                        <input type="radio" name="mood" value={mood.id} onClick={this.props.handleSelectedMood} /> 
                        <label className="font" htmlFor="mood">{mood.name}</label>
                    </div>
                    )}
                    <button className="ui teal basic button">Save</button>
                </form>   
                <form onSubmit={this.props.handleUpdateSubmit}>
                <button className="ui teal basic button">Update</button> 
                </form>   
                </div> 
                <div className="ui right aligned segment">
                 <PromptContainer prompts={this.props.prompts} className="ui segment"/>
                </div>  
            </div>
        )
    }
}

export default EntryForm