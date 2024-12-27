import { Movie } from "./movie.model";
import { Showtime } from "./showtime.model";

export class Theater {

    constructor(
        public id: Number,
        public name: string,
        public location: string,
        public phoneNumber: string,
        public ownerId: number,
        public movies: Movie[],
        public showtimes: Showtime[],
        public screens: Screen[],
        public createdAt: Date
    ) { }

}
