import { id } from "../../../tools/id/id";
import { ForeignContact } from "./foreignContact";
import { ForeignContactType } from "./foreignContactType";

export class ForeignContactBlank {
    constructor(
        public id: string | null,
        public type: ForeignContactType | null,
        public firstName: string | null,
        public middleName: string | null,
        public lastName: string | null,
        public phoneNumber: string | null
    ) { }

    public static empty = (): ForeignContactBlank => {
        return new ForeignContactBlank(null, null, null, null, null, null);
    }

    public static create = (contact: ForeignContact): ForeignContactBlank => {
        return new ForeignContactBlank(contact.id, contact.type, contact.firstName, contact.middleName, contact.lastName, contact.phoneNumber);
    }

    public static emptyWithType = (type: ForeignContactType): ForeignContactBlank => {
        return new ForeignContactBlank(id(), type, null, null, null, null);
    }
}