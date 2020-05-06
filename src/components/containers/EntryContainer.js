import React from 'react'
import EntryCard from '../presentational/EntryCard'
import '../NavBar'

class EntryContainer extends React.Component{

    render(){
    // const filteredEntries = this.props.entries.filter(entry => entry.user_id === this.props.user.id)
    const filteredMoodEntries = this.props.entries.filter(entry => entry.mood_id == this.props.selectedMood)
console.log(filteredMoodEntries)
        const colour = { color: 'rgba(89, 187, 187)'}
        return(
            <div className="center">
                <h1><i class="edit outline icon"></i>All Your Entries:</h1>
                <h5 style={colour}>Filter by mood:</h5>
                <select onChange={this.props.handleSelectedMood} className="ui loading selection dropdown">
                    <option value="All">All</option>
                    {this.props.moods.map((mood, i) => 
                    <option className="ui simple dropdown item" key={i} name="mood" value={mood.id}>{mood.name}</option>)}
                </select>
                <br />
                <br />
                <div className="row">
                {this.props.selectedMood === "All" ?
                this.props.entries.map(entry => 
                <EntryCard 
                entry={entry} 
                key={entry.id} 
                populateEntryForm={this.props.populateEntryForm} 
                selectEntryToDelete={this.props.selectEntryToDelete} 
                deleteEntry={this.props.deleteEntry}
                moods={this.props.moods}
                 />) :
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