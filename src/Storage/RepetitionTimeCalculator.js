import {LearningStorage} from "./LearningStorage";

export class RepetitionTimeCalculator {

    static ANSWERS_WITH_REPETITION_IN_ONE_DAY = 10;
    static ANSWERS_WITH_REPETITION_IN_TWO_DAYS = 20;
    static ANSWERS_WITH_REPETITION_IN_THREE_DAYS = 30;

    static countDaysFor(answerStreak) {
        if (answerStreak < 2) {
            throw new Error('Repetition time is calculate from ' + LearningStorage.ANSWER_FOR_LEARNED +  ' correct answers');
        }

        if(answerStreak <= RepetitionTimeCalculator.ANSWERS_WITH_REPETITION_IN_ONE_DAY) {
            return 1;
        }

        if(answerStreak <= RepetitionTimeCalculator.ANSWERS_WITH_REPETITION_IN_TWO_DAYS) {
            return 2;
        }

        if(answerStreak <= RepetitionTimeCalculator.ANSWERS_WITH_REPETITION_IN_THREE_DAYS) {
            return 3;
        }

        return (RepetitionTimeCalculator.countDaysFor(answerStreak - 1) + 1);
    }

    static countTimeFor(answerStreak) {
        return RepetitionTimeCalculator.countDaysFor(answerStreak) * 24 * 60 * 60 * 1000;
    }


}