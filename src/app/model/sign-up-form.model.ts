export class SignUpFormModel{
    constructor(
        public email:string,
        public password:string,
        public firstName:string,
        public middlename:string,
        public lastName:string,
        public phoneNumber:string
    ){}
}