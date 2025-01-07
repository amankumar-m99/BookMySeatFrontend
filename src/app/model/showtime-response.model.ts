export class ShowtimeResponse {
    constructor(
        public id: number,
        public startHH: number,
        public startMM: number,
        public date: Date,
        public movie: string,
        public screen: string,
        public theater: string
    ) { }
}