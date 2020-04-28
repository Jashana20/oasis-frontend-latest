import React from 'react'
import PromptCard from '../presentational/PromptCard'

class PromptContainer extends React.Component{

    state = {
        lifeSatisfaction: "",
        worthwhile: "",
        happiness: "",
        anxiety: ""
    }

    render(){
        return(
            <div>
                <h1>Prompts:</h1> 
                <p>These questions are from the Office for National Statistics 
                    and are used to measure personal well-being</p>
                    {this.props.prompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt}/>)}
            </div>
        )
    }
}

export default PromptContainer