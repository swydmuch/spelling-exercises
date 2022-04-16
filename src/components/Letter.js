import React from "react";

export class Letter extends React.Component {
    render() {
        return (
            <div className="Letter">{this.props.value}</div>
        )
    }
}