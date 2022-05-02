import {RepetitionTimeCalculator} from "./RepetitionTimeCalculator";

export class LearningStorage {
    static REPETITION_FOR_DIFFICULT = 2;
    static ANSWER_FOR_LEARNED = 2;
    static recordMistake(word, trainedCharacters) {
        let difficultWordsArray = LearningStorage.getAllDifficult();
        let alreadyAdded = false;
        difficultWordsArray = difficultWordsArray.map((eachWord) => {
            if (eachWord.word === word && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")) {
                alreadyAdded = true;
                eachWord.repetitionCounter = LearningStorage.REPETITION_FOR_DIFFICULT;
            }

            return eachWord;
        })

        if (!alreadyAdded) {
            const wordData = {
                word: word,
                trainedCharacters: trainedCharacters,
                repetitionCounter: LearningStorage.REPETITION_FOR_DIFFICULT,
            };

            difficultWordsArray.push(wordData);
        }
        localStorage.setItem('DifficultWords',JSON.stringify(difficultWordsArray));


        let learnedWords = LearningStorage.getAllLearned();
        learnedWords = learnedWords.filter(
            wordData => !(
                wordData.word === word
                && wordData.trainedCharacters.join(",") === trainedCharacters.join(",")
            )
        );
        localStorage.setItem('LearnedWords',JSON.stringify(learnedWords));
    }

    static getAllDifficult() {
        const currentContent = localStorage.getItem('DifficultWords');
        let difficultWordsArray = [];
        if (currentContent !== null) {
            difficultWordsArray = JSON.parse(currentContent);
        }

        return difficultWordsArray;
    }

    static getAllLearned() {
        const currentContent = localStorage.getItem('LearnedWords');
        let learnedWordsArray = [];
        if (currentContent !== null) {
            learnedWordsArray = JSON.parse(currentContent);
        }

        return learnedWordsArray;
    }

    static recordImprovement(word, trainedCharacters) {
        let difficultWordsArray = LearningStorage.getAllDifficult();
        difficultWordsArray.map((eachWord) => {
            if (eachWord.word === word && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")) {
                eachWord.repetitionCounter--;
            }

            return eachWord;
        })
        difficultWordsArray = difficultWordsArray.filter(
            wordData => !(
                wordData.word === word
                && wordData.trainedCharacters.join(",") === trainedCharacters.join(",")
                && wordData.repetitionCounter <= 0
            )
        );
        localStorage.setItem('DifficultWords',JSON.stringify(difficultWordsArray));

        let learnedWords = LearningStorage.getAllLearned();

        let alreadyAdded = false;
        learnedWords = learnedWords.map((eachWord) => {
            if (eachWord.word === word && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")) {
                alreadyAdded = true;
                eachWord.answerStreak++;
                eachWord.lastAnswer = (new Date()).toJSON();
            }

            return eachWord;
        })

        if (!alreadyAdded) {
            const wordData = {
                word: word,
                trainedCharacters: trainedCharacters,
                answerStreak: 1,
                lastAnswer: (new Date()).toJSON()
            };

            learnedWords.push(wordData);
        }
        localStorage.setItem('LearnedWords',JSON.stringify(learnedWords));

    }

    static isLearned(word, trainedCharacters) {
        let learnedWords = LearningStorage.getAllLearned();
        const now = new Date();
        for(const eachWord of  learnedWords) {
            if (eachWord.word === word
                && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")
                && eachWord.answerStreak >= LearningStorage.ANSWER_FOR_LEARNED
                && now - (new Date(eachWord.lastAnswer)) < RepetitionTimeCalculator.countTimeFor(eachWord.answerStreak)
            ) {
                return true;
            }
        }

        return false;
    }

    static isDifficult(word, trainedCharacters) {
        let learnedWords = LearningStorage.getAllDifficult();
        for(const eachWord of  learnedWords) {
            if (eachWord.word === word
                && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")
            ) {
                return true;
            }
        }

        return false;
    }

    static getLearnedToExercise() {
        return LearningStorage.getAllLearned().filter((eachWord) => {
            return !(
                LearningStorage.isLearned(eachWord.word, eachWord.trainedCharacters)
                || LearningStorage.isDifficult(eachWord.word, eachWord.trainedCharacters)
            );
        });
    }
}