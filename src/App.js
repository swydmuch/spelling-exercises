import './App.css';
import React from "react";
import {DataSet} from "./dataSet/DataSet.js";
import {Exercise} from "./components/Exercise";
import {CharactersList} from "./components/CharactersList";
import {Button} from "./components/Button";
import {StatusBar} from "./components/StatusBar";
import {MessageBag} from "./components/MessageBag";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.listTrainedCharacters = DataSet.getListTrainedCharacters();
        this.trainedCharacters = [];
        this.words = [];
        this.explanationsMap = [];
        this.state = {
            correctAnswer: 0,
            wrongAnswer: 0,
            word: null,
            gameStatus: App.GAME_READY,
            explanation: ""
        }

        this.positions = [];
        this.questionNumber = 0;
        this.questionDone = 0;

        this.incrementCorrectAnswerHandler = this.incrementCorrectAnswerHandler.bind(this);
        this.incrementWrongAnswerHandler = this.incrementWrongAnswerHandler.bind(this);
        this.changeWordHandler = this.changeWordHandler.bind(this);
        this.onResolveHandler = this.onResolveHandler.bind(this);
        this.onChangeTrainedCharactersHandler = this.onChangeTrainedCharactersHandler.bind(this);
    }

    static GAME_READY = 1;
    static GAME_SHOWED_EXERCISE = 2;
    static GAME_RESOLVED_EXERCISE = 3;
    static GAME_ENDED = 4;

    incrementCorrectAnswerHandler() {
        let correctAnswer = this.state.correctAnswer + 1;
        this.setState({
            correctAnswer: correctAnswer
        })
    }

    incrementWrongAnswerHandler() {
        let wrongAnswer = this.state.wrongAnswer + 1;
        this.setState({
            wrongAnswer: wrongAnswer
        })
    }

    getNextWord() {
        let index = Math.floor( Math.random() * this.words.length );
        const result = this.words[index];
        this.words.splice( index, 1 )
        return result;
    }

    changeWordHandler() {
        if (this.words.length === 0) {
            alert("Wybierz zestaw ćwiczeń z listy");
            return;
        }

        let nextWord = this.getNextWord();
        let explanation = "";
        if (this.explanationsMap.has(nextWord)) {
            explanation = this.explanationsMap.get(nextWord);
        }
        this.setState({
            word: nextWord,
            gameStatus : App.GAME_SHOWED_EXERCISE,
            explanation: explanation
        })
    }

    onResolveHandler() {
        this.setState({
            gameStatus : this.words.length > 0 ? App.GAME_RESOLVED_EXERCISE : App.GAME_ENDED
        })
    }

    onChangeTrainedCharactersHandler(e){
        this.trainedCharacters = e.currentTarget.value.split(",");
        this.words = DataSet.getWords(this.trainedCharacters);
        this.explanationsMap = DataSet.getExplanations();
    }
//TODO wyświetlanie ile cwiczeń pozostało do zakończenia
//TODO jakieś oznaczenie poprawnej i niepoprawnej odpowiedzi
    render() {
        return this.state.gameStatus === App.GAME_SHOWED_EXERCISE || this.state.gameStatus === App.GAME_RESOLVED_EXERCISE ||  this.state.gameStatus === App.GAME_ENDED  ? (
            <div className="App">
                <StatusBar
                    correctAnswer={this.state.correctAnswer}
                    wrongAnswer={this.state.wrongAnswer}
                ></StatusBar>
                <MessageBag
                    message={this.state.gameStatus === App.GAME_ENDED ? "KONIEC":""}
                    explanation={this.state.explanation}
                ></MessageBag>
                    <Exercise
                        value={this.state.word}
                        trainedCharacters={this.trainedCharacters}
                        onCorrectAnswer={this.incrementCorrectAnswerHandler}
                        onWrongAnswer={this.incrementWrongAnswerHandler}
                        onResolve={this.onResolveHandler}
                    ></Exercise>

                <Button
                    key="nextButton"
                    label="Następny"
                    onClick={this.changeWordHandler}
                    disabled={this.state.gameStatus === App.GAME_SHOWED_EXERCISE || this.state.gameStatus === App.GAME_ENDED}
                ></Button>

            </div>
        )
        :
        (
            <div className="App">
                <MessageBag explanation="Wybierz zestaw ćwiczeń"></MessageBag>
                <CharactersList onChange={this.onChangeTrainedCharactersHandler} data={this.listTrainedCharacters}></CharactersList>
                <Button onClick={this.changeWordHandler} label="START"></Button>
            </div>
        )
  }
}

export default App;
