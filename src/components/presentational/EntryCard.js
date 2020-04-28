import React from 'react'

class EntryCard extends React.Component{
    render(){
        return(
            <div>
                {this.props.entry.journal_entry}
                <br />
                <button onClick={() => this.props.populateEntryForm(this.props.entry)}>Edit</button>
                <br />
                <form onSubmit={this.props.deleteEntry}> 
                <button onClick={() => this.props.selectEntryToDelete(this.props.entry)}>Delete</button>
                </form>
            </div>
        )
    }
}

export default EntryCard