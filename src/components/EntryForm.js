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
        anxiety: ""
    }

    handlePromptInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmitEntry = (e) => {
        e.preventDefault()
        //      const entry = {
        //     entry: {journal_entry: this.props.entry, user_id: this.props.user.id, mood_id: this.props.selectedMood}
        // }
        //     const lifeSatisfactionAnswer = {
        //         answer: {question_id: 1, question_answer: this.state.lifeSatisfaction}
        // }
        //     const worthwhileAnswer = {
        //         answer: {question_id: 2, question_answer: this.state.worthwhile}
        // }
        //     const happinessAnswer = {
        //         answer: {question_id: 3, question_answer: this.state.happiness}
        // }
        //     const anxietyAnswer = {
        //         answer: {question_id: 4, question_answer: this.state.anxiety}
        //  }
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
        // .then(r => r.json())
        // .then(entry => this.props.addJournalEntry(entry))
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
                 <PromptContainer 
                 lifeSatisfaction={this.state.lifeSatisfaction}
                 worthwhile={this.state.worthwhile}
                 happiness={this.state.happiness}
                 anxiety={this.state.anxiety}
                 prompts={this.props.prompts} 
                 handlePromptInput={this.handlePromptInput}
                 className="ui segment"/>
                 <button className="ui teal basic button">Finished</button>
                </div> 
            </div>
        )
    }
}

export default EntryForm