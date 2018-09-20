export class NewQuestion {
    constructor(
        public id: number,
        public name: string,
        public comment: string,
        public questionsQnty: number,
        public expiresOn: string,
        public publicAccess: boolean
    ) {}
}
