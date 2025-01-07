import { Ticket } from "./ticket.model";
import { User } from "./user.model";

export class Booking {
    constructor(
        public id: number,
        public bookingDate: Date,
        public tickets: Ticket[],
        public user: User[]
    ) { }
}
