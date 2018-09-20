export class NewPoll {
    constructor(
        public id: number,
        public name: string,
        public questionsQnty: number,
        public expiresOn: string,
        public expiresMidnight: boolean,
        public publicAccess: string,
        public nameDiscloseOption: string,
        public expiresAt?: string,
        public comment?: string
    ) {}
}
