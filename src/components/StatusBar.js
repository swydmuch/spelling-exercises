import React from "react";

export class StatusBar extends React.Component {

    render() {
        return (
            <div className="StatusBar">
                <div className="CorrectAnswerNumber">Dobrze: <strong>{this.props.correctAnswer}</strong></div>
                <div className="WrongAnswerNumber">Źle: <strong>{this.props.wrongAnswer}</strong></div>
            </div>
        )
    }
}