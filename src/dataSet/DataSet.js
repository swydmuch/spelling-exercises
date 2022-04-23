import ExercisesData from "./exercises.json";
import ExplanationsData from "./explanations.json";
import {LearningStorage} from "../Storage/LearningStorage";

export class DataSet {
    static getWords(trainedCharacters) {
        for (const setOfExercises of ExercisesData) {
            if (setOfExercises.trainedCharacters.join(',') === trainedCharacters.join(',')) {
                return setOfExercises.words.map((word) => {
                    return {
                        word: word,
                        trainedCharacters: trainedCharacters
                    }
                }).filter((eachWord) => {
                    return !LearningStorage.isLearned(eachWord.word, eachWord.trainedCharacters);
                });
            }
        }

        throw new Error('trained characters not in data set');
    }

    static getListTrainedCharacters() {
        let list = [];
        for (const data of ExercisesData) {
            list.push(data.trainedCharacters.join(","));
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