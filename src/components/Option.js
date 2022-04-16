import React from "react";

export class Option extends React.Component {
    render() {
        return (
            <div className={
                this.props.isDone ?
                    this.props.value.toLowerCase() === this.props.answer.toLowerCase() ?
                        "CorrectAnswer"
                        : "WrongAnswer"
                    :
                    "Option"
                }
                onClick={this.props.onClick}
            >
                {this.props.value}
            </div>
        )
    }
}