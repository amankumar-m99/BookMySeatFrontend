import { Movie } from "./movie.model";
import { Screen } from "./screen.model";
import { Ticket } from "./ticket.model";
import { Timeslot } from "./timeslot.model";

export class Showtime{
    constructor(
        public id: number,
        public timeslot: Timeslot,
        public date: Date,
        public movie: Movie,
        public screen: Screen,
        public tickets: Ticket[]
    ){}
}