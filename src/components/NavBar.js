import React from 'react'
import './NavBar.css'



class NavBar extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li><a href="#signout" onClick={this.props.signOut}>sign out</a></li>
                    <li><a className="active" href="#home">home</a></li>
                    <li><a href="#entries" onClick={this.props.handleShowAllEntries} >entries</a></li>
                    <li><a href="#mood" onClick={this.props.handleShowMoodCharts}>mood</a></li>
                    <li className="logo"><a href="#about">OASIS</a></li>
                </ul>
            </div>
        )
    }
}

export default NavBar