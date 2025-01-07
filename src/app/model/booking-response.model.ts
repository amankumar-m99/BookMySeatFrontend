import { ShowtimeResponse } from "./showtime-response.model";

export class BookingResponseModel {
    constructor(
        public id: number,
        public bookingDate: Date,
        public showtimeDTO: ShowtimeResponse,
        public tickets: number[]
    ) { }
}