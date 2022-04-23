export class LearningStorage {
    static recordMistake(word, trainedCharacters) {
        let difficultWordsArray = LearningStorage.getAllDifficult();
        let alreadyAdded = false;
        difficultWordsArray = difficultWordsArray.map((eachWord) => {
            if (eachWord.word === word && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")) {
                alreadyAdded = true;
                eachWord.repetitionCounter = 3;
            }

            return eachWord;
        })

        if (!alreadyAdded) {
            const wordData = {
                word: word,
                trainedCharacters: trainedCharacters,
                repetitionCounter: 3,
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
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
        for(const eachWord of  learnedWords) {
            if (eachWord.word === word
                && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")
                && eachWord.answerStreak >= 3
                && (new Date()) - (new Date(eachWord.lastAnswer)) < sevenDaysInMs
            ) {
                return true;
            }
        }

        return false;
    }
}