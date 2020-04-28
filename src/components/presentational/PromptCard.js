import React from 'react'

class PromptCard extends React.Component{
    render(){
        return(
            <div>
                <h3>{this.props.prompt.question}</h3>
                <form>
                    <textarea type="text"
                    placeholder="Tell us..." 
                    name="entry" />
                    {/* // value=
                    // onChange=  */}
                </form>
            </div>
        )
    }
}

export default PromptCard