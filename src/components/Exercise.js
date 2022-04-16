import React from "react";
import {Question} from "./Question";
import {Letter} from "./Letter"



export class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.resolveQuestionHandler = this.resolveQuestionHandler.bind(this);
        this.positions = [];
        this.questionNumber = 0;
        this.questionDone = 0;

        this.state = {
            questionDone: 0
        }

    }

    analiseWord() {
        this.positions = [];
        this.questionNumber = 0;
        this.questionDone = 0;

        let questionNumber = 0;
        const matches = [...this.props.value.matchAll(new RegExp(this.props.trainedCharacters.join("|"), 'gi'))];
        const indexes = matches.map(a => a.index);
        for (let i = 0; i < this.props.value.length;) {
            if (indexes.includes(i)) {
                for (const item of matches) {
                    if (item.index === i) {
                        let founded = item[0];
                        this.positions.push({
                            character: founded,
                            type: "Question"
                        });
                        questionNumber++;
                        i += founded.length;
                    }
                }
            } else {
                this.positions.push({
                    character: this.props.value[i],
                    type: "Letter"
                });
                i++
            }
        }

        this.questionNumber = questionNumber;
    }

    resolveQuestionHandler() {
        let questionDone = this.state.questionDone + 1;

        if (questionDone === this.questionNumber) {
            this.props.onResolve();
            questionDone = 0;
        }

        this.setState({
            questionDone: questionDone
        })
    }

    prepareExercise() {
        this.analiseWord();
        let positionComponents = [];
        let positionCounter = 0;
        for (const position of this.positions) {
            if (position.type === "Question") {
                positionComponents.push(
                    <Question
                        value={position.character}
                        options={this.props.trainedCharacters}
                        onResolve={this.resolveQuestionHandler}
                        onCorrectAnswer={this.props.onCorrectAnswer}
                        onWrongAnswer={this.props.onWrongAnswer}
                        key={this.props.value + positionCounter.toString()}
                    ></Question>);
            } else if (position.type === "Letter") {
                positionComponents.push(
                    <Letter
                        value={position.character}
                        key={this.props.value + positionCounter.toString()}
                    ></Letter>);
            } else {
                throw new Error('Wrong type of position');
            }
            positionCounter++;
        }

        return positionComponents;
    }


    render() {
        return (
            <div className="Exercise">
                {this.prepareExercise()}
            </div>
        );
    }
}