export class NewOption {
    constructor(
        public id: number,
        public type: string,
        public text: string,
        public imageFile: string,
        public imageURL: string,
        public webURL: string,
        public videoURL: string,
        public startDateTime: number,
        public endDateTime: number,
    ) {}
}
