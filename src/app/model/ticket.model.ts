export class Ticket {
    constructor(
        public id: number,
        public seatNumber: string,
        public price: number,
        public isBooked: boolean
    ) { }
}
