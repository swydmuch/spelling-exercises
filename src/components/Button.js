import React from "react";

export class Button extends React.Component {


    render() {
        return (
            <button
                className="Button"
                type="button"
                onClick={this.props.onClick}
                disabled={this.props.disabled}
            >{this.props.label}</button>
        )
    }
}