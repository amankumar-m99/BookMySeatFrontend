import { ShowtimeResponse } from "./showtime-response.model";

export class MovieBookingShowDTO {
    constructor(
        public theaterId: number,
        public theaterName: string,
        public theaterLocation: string,
        public theaterPhoneNumber: string,
        public showtimeDTOs: ShowtimeResponse[]
    ) { }
}