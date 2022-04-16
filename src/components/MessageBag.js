import React from "react";

export class MessageBag extends React.Component {

    render() {
        return (
            <div className="MessageBag">
                <div className="Message"><strong>{this.props.message}</strong></div>
                <div className="Explanation"><strong>{this.props.explanation}</strong></div>
            </div>
        )
    }
}