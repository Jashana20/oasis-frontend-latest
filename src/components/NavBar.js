import React from 'react'
import './NavBar.css'



class NavBar extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li><a href="#signout" onClick={this.props.signOut}>
                    <i class="hand peace icon"></i>sign out</a></li>
                    <li><a href="#entries" value="entries" onClick={this.props.handleShowAllEntries} >
                    <i class="paper plane icon"></i>entries</a></li>
                    <li><a href="#mood" value="mood" onClick={this.props.handleShowMoodCharts}>
                    <i class="chart area icon"></i>mood</a></li>
                    <li className="logo"><a href="#about"><i class="leaf icon"></i>OASIS</a></li>

                </ul>
            </div>
        )
    }

    // {this.props.handleShowAllEntries}
    // {this.props.handleShowMoodCharts}
}

export default NavBar