import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'trained', headerName: 'Litery', width: 75 },
    { field: 'word', headerName: 'Słowo', width: 150 },
    { field: 'answerStreak', headerName: 'Liczba poprawnych odpowiedzi', width: 150 },
    { field: 'lastAnswer', headerName: 'Data ostatniej poprawnej odpowiedzi', width: 400 },
];

export class LearnedStats extends React.Component {
    constructor(props) {
        super(props);
        this.rows = this.props.words.map((eachWord, index) => { return ({
                word: eachWord.word,
                answerStreak: eachWord.answerStreak,
                id: index,
                trained: eachWord.trainedCharacters.join(","),
                lastAnswer: Date(eachWord.lastAnswer).toLocaleString()
        })});
    }

    render() {
        return (
            <div className="PopUp">
                <div className="PopUpInner">
                    <DataGrid rows={this.rows} columns={columns} />
                </div>
            </div>
        );
    }
}