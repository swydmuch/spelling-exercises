import {LearningStorage} from "./LearningStorage";

export class RepetitionTimeCalculator {

    static ANSWERS_WITH_NEXT_DAY_REPETITION = 10;

    static countDaysFor(answerStreak) {
        if (answerStreak < 2) {
            throw new Error('Repetition time is calculate from ' + LearningStorage.ANSWER_FOR_LEARNED +  ' correct answers');
        }

        if(answerStreak <= RepetitionTimeCalculator.ANSWERS_WITH_NEXT_DAY_REPETITION) {
            return 1;
        }

        return (RepetitionTimeCalculator.countDaysFor(answerStreak - 1) + 1);
    }

    static countTimeFor(answerStreak) {
        return RepetitionTimeCalculator.countDaysFor(answerStreak) * 24 * 60 * 60 * 1000;
    }


}