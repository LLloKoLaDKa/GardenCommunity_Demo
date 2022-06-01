import { id } from "../../../tools/id/id";
import { GardenStreet } from "../../gardens/gardenStreet";
import { GardenContact } from "./gardenContact";
import { GardenContactType } from "./gardenContactType";

export class GardenContactBlank {
    constructor(
        public id: string | null,
        public gardenerId: string | null,
        public type: GardenContactType | null,
        public phoneNumber: string | null,
        public street?: GardenStreet
    ) { }

    public static empty = (): GardenContactBlank => {
        return new GardenContactBlank(null, null, null, null);
    }

    public static create = (contact: GardenContact): GardenContactBlank => {
        return new GardenContactBlank(contact.id, contact.gardener.id, contact.type, contact.phoneNumber);
    }

    public static emptyWithType = (type: GardenContactType, street?: GardenStreet): GardenContactBlank => {
        return new GardenContactBlank(id(), null, type, null, street);
    }
}