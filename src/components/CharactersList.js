import React from "react";

export class CharactersList extends React.Component {
    render() {
        return (
            <select className="List" onChange={this.props.onChange}>
                <option key="-1" value="-1"></option>
                {this.props.data.map(
                    (characters, index) => <option key={index} value={characters.value} >{characters.label}</option>
                )}
            </select>
        )
    }
}