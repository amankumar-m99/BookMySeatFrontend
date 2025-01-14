export class MovieAddForm {

    constructor(
        public title: string,

        public description: string,

        public genre: string,

        public duration: number,

        public language: string,

        public rating: number,

        public releaseDate: Date

    ) { }
}