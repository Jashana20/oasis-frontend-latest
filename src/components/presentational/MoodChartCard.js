import React from 'react';
import { Line } from 'react-chartjs-2';


class MoodChartCard extends React.Component{

  moodData = this.props.user.entries.map(entry => entry.mood_id)
  entryData = this.props.user.entries.map(entry => entry.id)
  
    state = {
        chartData: {
        labels: this.entryData,
        datasets: [{
            label: "Your Mood",
            data: this.moodData,
            backgroundColor: 'rgba(219,241,240)'
            //  'rgba(255, 99, 132, 0.6)'
            // 173,216,230   
          }]
        }
    }
    
      render() {
        return (
          <div className="chart">
            <Line
            data={this.state.chartData}
            height={400}
            options={{
              maintainAspectRatio: false,
            }}
            />
            {console.log(this.moodData, this.entryData)}
          </div>
        );
      }

}

        // ['Idyllic', 'Cheerful', 'Humorous', 'Whimsical', 'Hopeful', 
        //         'Lighthearted', 'Romantic', 'Calm', 'Gloomy', 'Tense', 'Lonely', 'Fearful', 
        //         'Melancholy', 'Ominous', 'Angry']


export default MoodChartCard


