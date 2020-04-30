import React from 'react'
import EntryCard from '../presentational/EntryCard'
import '../NavBar'

class EntryContainer extends React.Component{

    render(){
    // const filteredEntries = this.props.entries.filter(entry => entry.user_id === this.props.user.id)
    const filteredMoodEntries = this.props.entries.filter(entry => entry.mood_id == this.props.selectedMood)
console.log(filteredMoodEntries)
        return(
            <div className="center">
                <h1><i class="edit outline icon"></i>All Your Entries:</h1>
                <h6>Filter by mood:</h6>
                <select onChange={this.props.handleSelectedMood} className="ui compact menu">
                    {this.props.moods.map((mood, i) => 
                    <option className="ui simple dropdown item" key={i} name="mood" value={mood.id}>{mood.name}</option>)}
                </select>
                <br />
                <div>
                {this.props.selectedMood === "" ? 
                this.props.entries.map(entry => 
                <EntryCard 
                entry={entry} 
                key={entry.id} 
                populateEntryForm={this.props.populateEntryForm} 
                selectEntryToDelete={this.props.selectEntryToDelete} 
                deleteEntry={this.props.deleteEntry}
                moods={this.props.moods}
                 />) 
                :
                 filteredMoodEntries.map(entry => 
                    <EntryCard 
                    entry={entry} 
                    key={entry.id} 
                    populateEntryForm={this.props.populateEntryForm} 
                    selectEntryToDelete={this.props.selectEntryToDelete} 
                    deleteEntry={this.props.deleteEntry}
                    moods={this.props.moods}
                     />)
                 }
                </div> 
            </div>
        )
    }
}

export default EntryContainer