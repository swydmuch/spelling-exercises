import './App.css';
import React from "react";
import {DataSet} from "./dataSet/DataSet.js";
import {Exercise} from "./components/Exercise";
import {CharactersList} from "./components/CharactersList";
import {Button} from "./components/Button";
import {StatusBar} from "./components/StatusBar";
import {MessageBag} from "./components/MessageBag";
import {LearningStorage} from "./Storage/LearningStorage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.listTrainedCharacters = DataSet.getListTrainedCharacters();
        this.explanationsMap = DataSet.getExplanations();
        this.difficultWords = LearningStorage.getAllDifficult();
        this.words = [];
        this.state = {
            correctAnswer: 0,
            wrongAnswer: 0,
            word: null,
            trainedCharacters: [],
            gameStatus: App.GAME_READY,
            isDifficultWords: false,
            explanation: ""
        }

        this.positions = [];
        this.questionNumber = 0;
        this.questionDone = 0;

        this.correctAnswerHandler = this.correctAnswerHandler.bind(this);
        this.wrongAnswerHandler = this.wrongAnswerHandler.bind(this);
        this.changeWordHandler = this.changeWordHandler.bind(this);
        this.onResolveHandler = this.onResolveHandler.bind(this);
        this.onChangeTrainedCharactersHandler = this.onChangeTrainedCharactersHandler.bind(this);
        this.startDifficultHandler = this.startDifficultHandler.bind(this);
        this.startSetHandler = this.startSetHandler.bind(this);
    }

    static GAME_READY = 1;
    static GAME_SHOWED_EXERCISE = 2;
    static GAME_RESOLVED_EXERCISE = 3;
    static GAME_ENDED = 4;

    correctAnswerHandler() {
        let correctAnswer = this.state.correctAnswer + 1;
        LearningStorage.recordImprovement(this.state.word, this.state.trainedCharacters);
        this.setState({
            correctAnswer: correctAnswer
        })
    }

    wrongAnswerHandler() {
        let wrongAnswer = this.state.wrongAnswer + 1;
        LearningStorage.recordMistake(this.state.word, this.state.trainedCharacters)

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
        let nextWord = this.getNextWord();
        let explanation = "";
        if (this.explanationsMap.has(nextWord.word)) {
            explanation = this.explanationsMap.get(nextWord.word);
        }
        this.setState({
            word: nextWord.word,
            trainedCharacters:  nextWord.trainedCharacters,
            gameStatus : App.GAME_SHOWED_EXERCISE,
            explanation: explanation
        })
    }

    startDifficultHandler() {
        this.setState({
            isDifficultWords: true
        });
        this.words = LearningStorage.getAllDifficult();
        this.changeWordHandler();
    }

    startSetHandler() {
        if (this.words.length === 0) {
            alert("W wybranym zestawie aktualnie nie masz nic do ćwiczenia");
            return;
        }

        this.setState({
            isDifficultWords: false
        });
        this.changeWordHandler();
    }

    onResolveHandler() {
        this.setState({
            gameStatus : this.words.length > 0 ? App.GAME_RESOLVED_EXERCISE : App.GAME_ENDED
        })
    }

    onChangeTrainedCharactersHandler(e){
        let trainedCharacters = e.currentTarget.value.split(",");
        this.words = DataSet.getWords(trainedCharacters);
    }

    prepareMainView() {
        return (
            <div className="App">
                <div className="Main">
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
                        trainedCharacters={this.state.trainedCharacters}
                        onCorrectAnswer={this.correctAnswerHandler}
                        onWrongAnswer={this.wrongAnswerHandler}
                        onResolve={this.onResolveHandler}
                    ></Exercise>

                    <Button
                        key="nextButton"
                        label="Następny"
                        onClick={this.changeWordHandler}
                        disabled={this.state.gameStatus === App.GAME_SHOWED_EXERCISE || this.state.gameStatus === App.GAME_ENDED}
                    ></Button>
                </div>
            </div>
        );
    }

    prepareMenuView() {
        return (
            <div className="App">
                <div className="Menu">
                    <div className="MenuLine">
                        <div>Wybierz zestaw ćwiczeń</div>
                        <CharactersList onChange={this.onChangeTrainedCharactersHandler} data={this.listTrainedCharacters}></CharactersList>
                        <Button onClick={this.startSetHandler} label="Ćwicz"></Button>
                    </div>
                    <div className="MenuLine">
                        <div>lub powtórz trudne słowa [<strong>{this.difficultWords.length}</strong> słów do powtórki]</div>
                        <Button
                            onClick={this.startDifficultHandler}
                            label="Powtórz"
                            disabled={this.difficultWords.length===0}
                        ></Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.state.gameStatus === App.GAME_SHOWED_EXERCISE
            || this.state.gameStatus === App.GAME_RESOLVED_EXERCISE
            ||  this.state.gameStatus === App.GAME_ENDED
        ?
            this.prepareMainView()
        :
            this.prepareMenuView()
  }
}

export default App;
