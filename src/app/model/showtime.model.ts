import { Movie } from "./movie.model";
import { Screen } from "./screen.model";

export class Showtime{
    constructor(
        public id: number,
        public startHH: number,
        public startMM: number,
        public movie: Movie,
        public screen: Screen
    ){}
}