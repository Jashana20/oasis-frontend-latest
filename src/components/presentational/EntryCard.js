import React from 'react'
import '../NavBar'


class EntryCard extends React.Component{ 

    entryMood = () => {
        const mood = this.props.moods.filter(mood => mood.id === this.props.entry.mood_id)
         const entryMood = mood.map(mood => mood.name)
        return entryMood
    } 

    render(){  
        return(
            <div className="column">
            <div className="card">
                <p>{this.props.entry.journal_entry}</p>
                <h4>
                <i class="frown outline icon"></i>
                <i class="meh outline icon"></i>
                <i class="smile outline icon"></i>
                     {this.entryMood()}</h4>
                <br />
                <div className="ui two buttons">
                <button className="ui small teal basic button" onClick={() => this.props.populateEntryForm(this.props.entry)}>
                <i class="pencil alternate icon"></i>Edit</button>
                <br />
                <form onSubmit={this.props.deleteEntry}> 
                <button className="ui small teal basic button" onClick={() => this.props.selectEntryToDelete(this.props.entry)}>
                <i class="trash alternate icon"></i>Delete</button>
                </form>
                </div>
            </div>
            </div>
        )
    }
}

export default EntryCard