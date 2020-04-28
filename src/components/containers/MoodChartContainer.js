import React from 'react'
import MoodChartCard from '../presentational/MoodChartCard'


class MoodChart extends React.Component{
    render(){
        return(
            <div>
                <h1>Mood Chart</h1>
                <h2>Tracks your mood across all of your journal entries..</h2>
                <h3>The higher the curve, the greater the mood!</h3>
                <MoodChartCard user={this.props.user} moods={this.props.moods}/>
            </div>
        )
    }
}

export default MoodChart