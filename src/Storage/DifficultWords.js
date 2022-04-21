export class DifficultWords {
    static recordMistake(word, trainedCharacters) {
        let difficultWordsArray = DifficultWords.getAll();
        let alreadyAdded = false;
        difficultWordsArray = difficultWordsArray.map((eachWord) => {
            if (eachWord.word === word && trainedCharacters.join(",") === eachWord.trainedCharacters.join(",")) {
                alreadyAdded = true;
                eachWord.repetitionCounter = eachWord.repetitionCounter + 3;
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
    }

    static getAll() {
        const currentContent = localStorage.getItem('DifficultWords');
        let difficultWordsArray = [];
        if (currentContent !== null) {
            difficultWordsArray = JSON.parse(currentContent);
        }

        return difficultWordsArray;
    }

    static recordImprovement(word, trainedCharacters) {
        let difficultWordsArray = DifficultWords.getAll();
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
    }
}