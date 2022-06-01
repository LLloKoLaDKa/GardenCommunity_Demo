import { AllContacts } from "./allContacts";
import { EmergencyContactBlank } from "./emergencyContacts/emergencyContactBlank";
import { ForeignContactBlank } from "./foreignContacts/foreignContactBlank";
import { GardenContactBlank } from "./gardenContacts/gardenContactBlank";

export class AllContactsBlank {
    constructor(
        public emergencyContacts: EmergencyContactBlank[],
        public foreignContacts: ForeignContactBlank[],
        public gardenContacts: GardenContactBlank[],
    ) { }

    public static create = (contacts: AllContacts): AllContactsBlank => {
        return new AllContactsBlank(
            contacts.emergencyContacts.map(ec => EmergencyContactBlank.create(ec)),
            contacts.foreignContacts.map(ec => ForeignContactBlank.create(ec)),
            contacts.gardenContacts.map(ec => GardenContactBlank.create(ec))
        );
    }
}