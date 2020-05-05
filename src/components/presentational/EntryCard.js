import React from 'react'
import '../NavBar'


class EntryCard extends React.Component{ 

    entryMood = () => {
        const mood = this.props.moods.filter(mood => mood.id === this.props.entry.mood_id)
         const entryMood = mood.map(mood => mood.name)
        return entryMood
    } 

    render(){  

        const Colour = { color: 'grey'}

        return(
            <div className="column" style={Colour}>
            <div className="card">
                <p>{this.props.entry.journal_entry}</p>
                <h4>
                <i class="frown outline icon"></i>
                <i class="meh outline icon"></i>
                <i class="smile outline icon"></i>
                     {this.entryMood()}</h4>
                <br />
                <button className="ui left floated button" onClick={() => this.props.populateEntryForm(this.props.entry)}>
                <i class="pencil alternate icon"></i>Edit</button>
                <br />
                <div className="button up">
                <form onSubmit={this.props.deleteEntry} className="form padding"> 
                <button className="ui right floated button" onClick={() => this.props.selectEntryToDelete(this.props.entry)}>
                <i class="trash alternate icon"></i>Delete</button>
                </form>
                </div>
                {/* <button className="ui small teal basic button">Email to self</button> */}
            </div>
            </div>
        )
    }
}

export default EntryCard