export class TimeslotRequestDTO{
    constructor(
        public startHH: number,
        public startMM: number,
        public theaterId: number
    ) { }
}