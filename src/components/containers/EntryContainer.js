import React from 'react'
import EntryCard from '../presentational/EntryCard'

class EntryContainer extends React.Component{

    render(){
    // const filteredEntries = this.props.entries.filter(entry => entry.user_id === this.props.user.id)
    const filteredMoodEntries = this.props.entries.filter(entry => entry.mood_id == this.props.selectedMood)
console.log(filteredMoodEntries)
        return(
            <div>
                <h1>All Your Entries:</h1>
                <h6>Filter by mood:</h6>
                <select onChange={this.props.handleSelectedMood}>
                    {this.props.moods.map((mood, i) => 
                    <option key={i} name="mood" value={mood.id}>{mood.name}</option>)}
                </select>
                <br />
                {this.props.selectedMood === "" ? 
                this.props.entries.map(entry => 
                <EntryCard 
                entry={entry} 
                key={entry.id} 
                populateEntryForm={this.props.populateEntryForm} 
                selectEntryToDelete={this.props.selectEntryToDelete} 
                deleteEntry={this.props.deleteEntry}
                 />) 
                :
                 filteredMoodEntries.map(entry => 
                    <EntryCard 
                    entry={entry} 
                    key={entry.id} 
                    populateEntryForm={this.props.populateEntryForm} 
                    selectEntryToDelete={this.props.selectEntryToDelete} 
                    deleteEntry={this.props.deleteEntry}
                     />)
                 } 
            </div>
        )
    }
}

export default EntryContainer