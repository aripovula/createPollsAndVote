export class NewPoll {
    constructor(
        public name: string,
        public questionsQnty: number,
        public expiresOn: string,
        public expiresMidnight: boolean,
        public publicAccess: string,
        public nameDiscloseOption: string,
        public createdBy: string,
        public createdTimeStamp: string,
        public expiresAt: string,
        public comment: string
    ) {}
}
