import { VotedQuestion } from './voted-question-model';

export class AVote {
    constructor(
        public pollID: string,
        public voterID: string,
        public voterName: string,
        public voteNameDisclosureType: string,
        public questions: Array<VotedQuestion>
    ) {}
}
