import React from 'react'
import PromptCard from '../presentational/PromptCard'

const BASE_URL = "http://localhost:3000"

class PromptContainer extends React.Component{

    state = {
        previousAnswers: [],
        rightAnswers: []
    }

    componentDidMount(){
        fetch(BASE_URL + "/answers")
        .then(res => res.json())
        .then(data => this.setState({previousAnswers: data}))
        .then(this.filterAnswers)
    }

    filterAnswers = () => {
 
    }

    render(){
        return(
            <div>
                <h2>Optional prompts:</h2> 
                <h3>These questions are from the Office for National Statistics 
                    and are used to measure personal well-being.</h3>
                    <form className="ui form">
                    {this.props.prompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} />)}
                    <textarea className="field" rows="4" cols="50" type="text" name="lifeSatisfaction" 
                    value={this.props.lifeSatisfaction}
                    onChange={this.props.handlePromptInput}
                    placeholder={this.props.prompts[0].question} />
                    <br />
                    <textarea className="field" rows="4" cols="50" type="text" name="worthwhile"
                    value={this.props.worthwhile} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[1].question}/>
                    <br />
                    <textarea className="field" rows="4" cols="50" type="text" name="happiness" 
                    value={this.props.happiness} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[2].question}/>
                    <br />
                    <textarea className="field" rows="4" cols="50" type="text" name="anxiety" 
                    value={this.props.anxiety} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[3].question}/>
                    </form>
            </div>
        )
    }
}

export default PromptContainer