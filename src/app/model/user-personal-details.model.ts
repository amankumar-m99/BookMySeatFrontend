import { User } from "./user.model";

export class UserPersonalDetails{
    constructor(
        public id:number,
        public firstName:string,
        public middleName:string,
        public lastName:string,
        public phoneNumber:string,
        public user: User
    ){}
}
