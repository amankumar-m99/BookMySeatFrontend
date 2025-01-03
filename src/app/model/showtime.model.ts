import { Movie } from "./movie.model";
import { Screen } from "./screen.model";
import { Timeslot } from "./timeslot.model";

export class Showtime{
    constructor(
        public id: number,
        public timeslot: Timeslot,
        public movie: Movie,
        public screen: Screen
    ){}
}