import React from "react";

export class CharactersList extends React.Component {
    render() {
        return (
            <select className="List" onChange={this.props.onChange}>
                {this.props.data.map(
                    (characters, index) => <option key={index} value={characters.value} >{characters.label}</option>
                )}
            </select>
        )
    }
}