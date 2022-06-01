import { id } from "../../../tools/id/id";
import { EmergencyContact } from "./emergencyContact";
import { EmergencyContactType } from "./emergencyContactType";

export class EmergencyContactBlank {
    constructor(
        public id: string | null,
        public type: EmergencyContactType | null,
        public cityPhone: string | null,
        public mobilePhone: string | null
    ) { }

    public static empty = () => {
        return new EmergencyContactBlank(null, null, null, null);
    }

    public static create = (contact: EmergencyContact) => {
        return new EmergencyContactBlank(contact.id, contact.type, contact.cityPhone, contact.mobilePhone);
    }

    public static emptyWithType = (type: EmergencyContactType): EmergencyContactBlank => {
        return new EmergencyContactBlank(id(), type, null, null);
    }
}