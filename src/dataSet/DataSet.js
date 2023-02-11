import ExercisesData from "./exercises.json";
import ExplanationsData from "./explanations.json";
import {LearningStorage} from "../Storage/LearningStorage";

export class DataSet {
    static getWords(trainedCharacters) {
       return ExercisesData.words
           .filter(word => word.indexOf(trainedCharacters[0]) > -1 || word.indexOf(trainedCharacters[1]) > -1 )
           .map((word) => {
                return {
                    word: word,
                    trainedCharacters: trainedCharacters
                }
        });

        throw new Error('trained characters not in data set');
    }

    static getListTrainedCharacters() {
        let list = [];
        let words = [];
        for (const data of ExercisesData.trainedCharacters) {
            words = DataSet.getWords(data);
            list.push({
                value: data.join(","),
                label: data.join(",") + " [" + words.length + " słów do nauki]"
            });
        }

        return list;
    }

    static getExplanations() {
        let explanationsMap = new Map();
        for (const eachExplanation of ExplanationsData) {
            explanationsMap.set(eachExplanation.word, eachExplanation.explanation)
        }

        return explanationsMap;
    }
}