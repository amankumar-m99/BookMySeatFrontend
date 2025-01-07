export class BookingRequest {
    constructor(
        public showtimeId: number,
        public userId: number,
        public ticketIds: number[],
    ) { }
}