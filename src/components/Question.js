import React from "react";
import {Option} from "./Option";


export class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDone: false,
            isCorrect: null
        }

        this.correctAnswerHandler = this.correctAnswerHandler.bind(this);
        this.wrongAnswerHandler = this.wrongAnswerHandler.bind(this);
    }

    correctAnswerHandler() {
        this.setState({
            isDone: true,
            isCorrect: true
        })

        this.props.onResolve();
        this.props.onCorrectAnswer();
    }

    wrongAnswerHandler() {
        this.setState({
            isDone: true,
            isCorrect: false
        })

        this.props.onResolve();
        this.props.onWrongAnswer();
    }

    capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    prepareOptions() {
        let optionComponents = []
        let optionCounter = 0;
        let answer = this.props.value;
        let correctAnswerHandler = this.correctAnswerHandler;
        let wrongAnswerHandler = this.wrongAnswerHandler;
        for (const item of this.props.options) {
            let firstUpper = false;
            if (answer === answer.toUpperCase()) {
                firstUpper = true;
            }
            optionComponents.push(
                <Option
                    key={optionCounter++}
                    value={firstUpper ? this.capitalizeFirstLetter(item): item}
                    answer={answer}
                    isDone={this.state.isDone}
                    onClick={this.state.isDone ? null : item.toLowerCase() === answer.toLowerCase() ? correctAnswerHandler : wrongAnswerHandler}
                ></Option>
            );
        }
        return optionComponents;
    }

    render() {
        return (
            <div className="Question">
                {this.prepareOptions()}
            </div>
        )
    }
}