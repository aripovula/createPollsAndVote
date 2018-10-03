export class NewOption {
    constructor(
        public id: number,
        public type: string,
        public text: string,
        public imageFile: string,
        public imageURL: string,
        public webURL: string,
        public videoURL: string,
        public startDate: string,
        public endDate: string,
        public startTime: string,
        public endTime: string
    ) {}
}
