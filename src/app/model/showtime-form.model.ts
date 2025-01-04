export class ShowtimeForm {
    constructor(
        public theaterId: number,
        public screenId: number,
        public movieId: number,
        public timeslotId: number,
        public date: Date
    ) { }
}