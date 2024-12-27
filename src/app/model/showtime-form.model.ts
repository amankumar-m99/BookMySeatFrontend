export class ShowtimeForm {
    constructor(
        public movieId:number,
        public screenId:number,
        public theaterId:number,
        public startHH:number,
        public startMM:number
    ) { }
}