import { EmergencyContact } from "./emergencyContacts/emergencyContact";
import { ForeignContact } from "./foreignContacts/foreignContact";
import { GardenContact } from "./gardenContacts/gardenContact";

export class AllContacts {
    constructor(
        public readonly emergencyContacts: EmergencyContact[],
        public readonly foreignContacts: ForeignContact[],
        public readonly gardenContacts: GardenContact[],
    ) { }
}

export namespace AllContacts {
    export function toModel(object: any): AllContacts {
        return new AllContacts(
            EmergencyContact.toModels(object.emergencyContacts as any[]),
            ForeignContact.toModels(object.foreignContacts as any[]),
            GardenContact.toModels(object.gardenContacts as any[]));
    }
}