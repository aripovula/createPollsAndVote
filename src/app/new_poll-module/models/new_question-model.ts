import { NewOption } from './new_option-model';

export class NewQuestion {
    constructor(
        public id: number,
        public multipleChoice: string,
        public q_text: string,
        public questionsQnty: number,
        public imageSize: string,
        public q_options: Array<NewOption>
    ) {}
}
