import { UserpersonalDetails } from "./user-personal-details.model"

export class User {
    constructor(
        public id: number,
        public email: string,
        public username: string,
        public password: string,
        public role:string,
        public createdAt: string,
        public personalDetails: UserpersonalDetails
    ) { }
}
