import { NewOption } from './new_option-model';

export class NewQuestion {
    constructor(
        public id: string,
        public sequenceNumber: number,
        public questionOfPollWithId: string,
        public multipleChoice: string,
        public q_text: string,
        public questionsQnty: number,
        public imageSize: string,
        public q_options: Array<NewOption>
    ) {}
}
