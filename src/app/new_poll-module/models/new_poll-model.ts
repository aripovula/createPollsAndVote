export class NewPoll {
    constructor(
        public id: string,
        public name: string,
        public questionsQnty: number,
        public publicAccess: string,
        public nameDiscloseOption: string,
        public createdBy: string,
        public createdTimeStamp: number,
        public expiresTimeStamp: number,
        public comment: string,
        public privateAccessType: string,
        public privateAccessorsList: string
    ) {}
}
