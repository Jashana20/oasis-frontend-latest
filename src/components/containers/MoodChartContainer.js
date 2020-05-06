import React from 'react'
import MoodChartCard from '../presentational/MoodChartCard'


class MoodChart extends React.Component{
    render(){
        const colour = { color: 'rgba(89, 187, 187)'}
        return(
            <div>
                <h1>Mood Chart</h1>
                <h2>Tracks your mood across all of your journal entries..</h2>
                <h3 style={colour}>The higher the curve, the greater the mood!</h3>
                <MoodChartCard user={this.props.user} moods={this.props.moods}/>
            </div>
        )
    }
}

export default MoodChart