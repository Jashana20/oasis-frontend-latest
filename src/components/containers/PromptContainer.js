import React from 'react'
import PromptCard from '../presentational/PromptCard'

class PromptContainer extends React.Component{
    render(){
        return(
            <div>
                <h1>Optional prompts:</h1> 
                <p>These questions are from the Office for National Statistics 
                    and are used to measure personal well-being.</p>
                    <form>
                    {this.props.prompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} />)}
                    <textarea rows="4" cols="50" type="text" name="lifeSatisfaction" 
                    value={this.props.lifeSatisfaction}
                    onChange={this.props.handlePromptInput}
                    placeholder={this.props.prompts[0].question} />
                    <br />
                    <textarea rows="4" cols="50" type="text" name="worthwhile"
                    value={this.props.worthwhile} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[1].question}/>
                    <br />
                    <textarea rows="4" cols="50" type="text" name="happiness" 
                    value={this.props.happiness} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[2].question}/>
                    <br />
                    <textarea rows="4" cols="50" type="text" name="anxiety" 
                    value={this.props.anxiety} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[3].question}/>
                    </form>
            </div>
        )
    }
}

export default PromptContainer