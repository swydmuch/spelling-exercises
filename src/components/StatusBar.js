import React from "react";

export class StatusBar extends React.Component {

    render() {
        return (
            <div className="StatusBar">
                <div className="Row Correct">
                    <div className="Label">Dobrze:</div><div className="Number">{this.props.correctAnswer}</div>
                </div>
                <div className="Row Wrong">
                    <div className="Label">Źle:</div><div className="Number">{this.props.wrongAnswer}</div>
                </div>
            </div>
        )
    }
}