import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import {Button} from "./Button";

const columns: GridColDef[] = [
    { field: 'trained', headerName: 'Litery', width: 75 },
    { field: 'word', headerName: 'Słowo', width: 200 },
    { field: 'repetitionCounter', headerName: 'Liczba powtórzeń do wykonania', width: 350 }
];

export class DifficultStats extends React.Component{
    constructor(props) {
        super(props);
        this.rows = this.props.words.map((eachWord, index) => { return ({
            word: eachWord.word,
            repetitionCounter: eachWord.repetitionCounter,
            id: index,
            trained: eachWord.trainedCharacters.join(",")
        })});
    }

    render() {
        return (
            <div className="PopUp">
                <div className="PopUpInner">
                    <DataGrid rows={this.rows} columns={columns} />
                    <Button
                        onClick={this.props.onClose}
                        label="Zamknij"
                    ></Button>
                </div>
            </div>
        );
    }
}