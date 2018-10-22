import { SelectedCLs } from './selected-cls-model';

export class VotedQuestion {
    constructor(
        public questionID: string,
        public type: number,
        public CLs: Array<SelectedCLs>,
        public Radio: string
    ) {}
}
