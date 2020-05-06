import React from 'react'
import PromptContainer from './containers/PromptContainer'
// import API from './API'
import './NavBar.css'
import '../App.css';


class EntryForm extends React.Component{

    state = {
        lifeSatisfaction: "",
        worthwhile: "",
        happiness: "",
        anxiety: "",
        showPrompts: false
    }


    handleShowPrompt = () => {
        this.setState({showPrompts: !this.state.showPrompts})
    }

    handlePromptInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmitEntry = (e) => {
        e.preventDefault()
        const questions = this.state.happiness? [{question_id: 1, question_answer: this.state.lifeSatisfaction}, {question_id: 2, question_answer: this.state.worthwhile}, {question_id: 3, question_answer: this.state.happiness}, {question_id: 4, question_answer: this.state.anxiety}] : []
        const body = {
            entry: {journal_entry: this.props.entry, user_id: this.props.user.id, mood_id: this.props.selectedMood},
            questions: questions
        }
        fetch("http://localhost:3000/entries", {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(entry => this.props.addJournalEntry(entry))
        // .then(data => console.log(data))
        .then(this.setState({
            lifeSatisfaction: "",
            worthwhile: "",
            happiness: "",
            anxiety: ""
        }))
    }

    render(){
        return(
            <div className="margin">
                <div className="ui raised segment">
                <h2>Whats up in the air today?</h2>
                <button className="ui teal basic button" onClick={this.handleShowPrompt}>Show Prompts</button>
                <form onSubmit={this.handleSubmitEntry} className="ui form">
                    <br />
                    <textarea className="field" rows="15" type="text" placeholder="Tell us..." 
                    name="entry" 
                    value={this.props.entry}
                    onChange={this.props.handleEntryForm}/>
                    <br />
                    <h2>Could you summarise todays feeling with a word?</h2>
                    <br />
                    {this.props.moods.map((mood, i) => 
                    <div key={i}>
                        <input className="ui radio checkbox" type="radio" name="mood" value={mood.id} onClick={this.props.handleSelectedMood} />
                        <label className="font" htmlFor="mood">{mood.name}</label>
                        <br />
                    </div>
                    )}
                    <br />
                    <br />
                    <button className="ui teal basic button">Save</button>
                </form>   
                <form onSubmit={this.props.handleUpdateSubmit}>
                <button className="ui teal basic button">Update</button> 
                </form>   
                {this.state.showPrompts && 
                <div>
                <br />
                 <PromptContainer 
                 lifeSatisfaction={this.state.lifeSatisfaction}
                 worthwhile={this.state.worthwhile}
                 happiness={this.state.happiness}
                 anxiety={this.state.anxiety}
                 prompts={this.props.prompts} 
                 handlePromptInput={this.handlePromptInput}
                 user={this.props.user}
                 className="ui segment"/>
                </div> }
                </div> 
            </div>
        )
    }
}

export default EntryForm