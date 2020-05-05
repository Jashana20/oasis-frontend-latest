import React from 'react'
import PromptCard from '../presentational/PromptCard'

const BASE_URL = "http://localhost:3000"

class PromptContainer extends React.Component{

    state = {
        previousAnswers: [],
        showPreviousAnswerOne: false,
        showPreviousAnswerTwo: false,
        showPreviousAnswerThree: false,
        showPreviousAnswerFour: false
    }

    componentDidMount(){
        fetch(BASE_URL + "/showAnswers/" + this.props.user.id)
        .then(res => res.json())
        .then(data => this.setState({previousAnswers: data}))
    }

    handleShowPreviousAnswerOne = () => {
        this.setState({showPreviousAnswerOne: !this.state.showPreviousAnswerOne})
    }

    handleShowPreviousAnswerTwo = () => {
        this.setState({showPreviousAnswerTwo: !this.state.showPreviousAnswerTwo})
    }

    handleShowPreviousAnswerThree = () => {
        this.setState({showPreviousAnswerThree: !this.state.showPreviousAnswerThree})
    }

    handleShowPreviousAnswerFour = () => {
        this.setState({showPreviousAnswerFour: !this.state.showPreviousAnswerFour})
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
                    <button className="ui mini teal basic button"
                    onClick={this.handleShowPreviousAnswerOne}>Show Previous Answer</button>
                    {this.state.showPreviousAnswerOne && <p>{this.state.previousAnswers[0].question_answer}</p>}
                    <br />
                    <br />
                    <textarea className="field" rows="4" cols="50" type="text" name="worthwhile"
                    value={this.props.worthwhile} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[1].question}/>
                    <button className="ui mini teal basic button"
                    onClick={this.handleShowPreviousAnswerTwo}>Show Previous Answer</button>
                    {this.state.showPreviousAnswerTwo && <p>{this.state.previousAnswers[1].question_answer}</p>}
                    <br />
                    <br />
                    <textarea className="field" rows="4" cols="50" type="text" name="happiness" 
                    value={this.props.happiness} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[2].question}/>
                    <button className="ui mini teal basic button"
                    onClick={this.handleShowPreviousAnswerThree}>Show Previous Answer</button>
                    {this.state.showPreviousAnswerThree && <p>{this.state.previousAnswers[2].question_answer}</p>}
                    <br />
                    <br />
                    <textarea className="field" rows="4" cols="50" type="text" name="anxiety" 
                    value={this.props.anxiety} 
                    onChange={this.props.handlePromptInput} 
                    placeholder={this.props.prompts[3].question}/>
                    <button className="ui mini teal basic button"
                    onClick={this.handleShowPreviousAnswerFour}>Show Previous Answer</button>
                    {this.state.showPreviousAnswerFour && <p>{this.state.previousAnswers[3].question_answer}</p>}
                    </form>
            </div>
        )
    }
}

export default PromptContainer