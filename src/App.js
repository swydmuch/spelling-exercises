import './App.css';
import React from "react";
import {DataSet} from "./dataSet/DataSet.js";
import {Exercise} from "./components/Exercise";
import {CharactersList} from "./components/CharactersList";
import {Button} from "./components/Button";
import {StatusBar} from "./components/StatusBar";
import {MessageBag} from "./components/MessageBag";
import {LearningStorage} from "./Storage/LearningStorage";
import {LearnedStats} from "./components/LearnedStats";
import {DifficultStats} from "./components/DifficultStats";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.listTrainedCharacters = DataSet.getListTrainedCharacters();
        this.explanationsMap = DataSet.getExplanations();
        this.difficultWords = LearningStorage.getAllDifficult();
        this.learnedWords = LearningStorage.getLearnedToExercise();
        this.words = [];
        this.state = {
            correctAnswer: 0,
            wrongAnswer: 0,
            word: null,
            trainedCharacters: [],
            gameStatus: App.GAME_READY,
            explanation: "",
            showLearnedStats: false,
            showDifficultStats: false
        }

        this.positions = [];
        this.questionNumber = 0;
        this.questionDone = 0;
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
        this.words = this.difficultWords;
        this.changeWordHandler();
    }

    startRepetitionHandler() {
        this.words = this.learnedWords;
        this.changeWordHandler();
    }

    startSetHandler() {
        if (this.words.length === 0) {
            alert("W wybranym zestawie aktualnie nie masz nic do ćwiczenia");
            return;
        }

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

    toggleLearnedStats() {
        this.setState({
            showLearnedStats: !this.state.showLearnedStats
        });
    }

    toggleDifficultStats() {
        this.setState({
            showDifficultStats: !this.state.showDifficultStats
        });
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
                        onCorrectAnswer={this.correctAnswerHandler.bind(this)}
                        onWrongAnswer={this.wrongAnswerHandler.bind(this)}
                        onResolve={this.onResolveHandler.bind(this)}
                    ></Exercise>

                    <Button
                        key="nextButton"
                        label="Następny"
                        onClick={this.changeWordHandler.bind(this)}
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
                    <div className="MenuHeader">
                        <div>Jak chcesz się dzisiaj uczyć?</div>
                    </div>
                    <div className="MenuLine">
                        <div>Wybierz zestaw ćwiczeń</div>
                        <CharactersList onChange={this.onChangeTrainedCharactersHandler.bind(this)}
                                        data={this.listTrainedCharacters}></CharactersList>
                        <Button onClick={this.startSetHandler.bind(this)} label="Ćwicz"></Button>
                    </div>
                    <div className="MenuLine">
                        <div>Powtórz ćwiczone słowa [<strong>{this.learnedWords.length}</strong> słów do powtórki]</div>
                        <Button
                            onClick={this.toggleLearnedStats.bind(this)}
                            disabled={this.learnedWords.length === 0}
                            label="Lista"
                        ></Button>
                        <Button
                            onClick={this.startRepetitionHandler.bind(this)}
                            label="Powtórz"
                            disabled={this.learnedWords.length === 0}
                        ></Button>
                    </div>
                    <div className="MenuLine">
                        <div>Powtórz trudne słowa [<strong>{this.difficultWords.length}</strong> słów do powtórki]</div>
                        <Button
                            onClick={this.toggleDifficultStats.bind(this)}
                            disabled={this.difficultWords.length === 0}
                            label="Lista"
                        ></Button>
                        <Button
                            onClick={this.startDifficultHandler.bind(this)}
                            label="Powtórz"
                            disabled={this.difficultWords.length === 0}
                        ></Button>

                    </div>
                </div>
                {
                    this.state.showLearnedStats ?
                    <LearnedStats words={this.learnedWords} onClose={this.toggleLearnedStats.bind(this)}></LearnedStats>
                    : null
                }
                {
                    this.state.showDifficultStats ?
                        <DifficultStats words={this.difficultWords} onClose={this.toggleDifficultStats.bind(this)}></DifficultStats>
                        : null
                }
            </div>
        );
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
