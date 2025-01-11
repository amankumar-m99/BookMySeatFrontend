import { Movie } from "./movie.model";
import { Showtime } from "./showtime.model";
import { Timeslot } from "./timeslot.model";
import { Screen } from "./screen.model"
import { User } from "./user.model";

export class Theater {

    constructor(
        public id: number,
        public name: string,
        public location: string,
        public phoneNumber: string,
        public owner: User,
        public ownerId: number,
        public timeslots: Timeslot[],
        public movies: Movie[],
        public showtimes: Showtime[],
        public screens: Screen[],
        public createdAt: Date
    ) { }

}
