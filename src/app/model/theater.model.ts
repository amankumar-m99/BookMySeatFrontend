export class Theater {

    constructor(
        public id: Number,
        public name: string,
        public location: string,
        public phoneNumber: string,
        public createdAt: Date,
        public ownerId: number,
        public screenIds: number[],
        public movieIds: number[]
    ) { }

}
