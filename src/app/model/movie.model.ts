import { Theater } from "./theater.model";

export class Movie {
    constructor(
        public id: number,
    
        public title: string,

        public description: string,

        public genre: string,

        public duration: number,

        public language: string,

        public rating: number,

        public posterUrl: string,

        public releaseDate: Date,

        public theaters: Theater[]

    ) { }

    public static getDummyMovie():Movie{
        return new Movie(0, "", "", "", 0, "", 0, "", new Date(), []);
    }
}