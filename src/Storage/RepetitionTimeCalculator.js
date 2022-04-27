export class RepetitionTimeCalculator {
    static countDaysFor(answerStreak) {
        if (answerStreak < 2) {
            throw new Error('Repetition time is calculate from 2 correct answers');
        }

        if(answerStreak === 2) {
            return 1;
        }

        return (RepetitionTimeCalculator.countDaysFor(answerStreak - 1) + (answerStreak - 2));
    }

    static countTimeFor(answerStreak) {
        return RepetitionTimeCalculator.countDaysFor(answerStreak) * 24 * 60 * 60 * 1000;
    }


}