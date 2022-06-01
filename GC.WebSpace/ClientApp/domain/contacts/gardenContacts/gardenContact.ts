import { Gardener } from "../../gardens/gardeners/gardener";
import { GardenContactType } from "./gardenContactType";

export class GardenContact {
    constructor(
        public readonly id: string,
        public readonly gardener: Gardener,
        public readonly type: GardenContactType,
        public readonly phoneNumber: string,
    ) { }
}

export namespace GardenContact {
    export function toModel(object: any): GardenContact {
        return new GardenContact(object.id, Gardener.toModel(object.gardener), object.type, object.phoneNumber);
    }

    export function toModels(objects: any[]): GardenContact[] {
        return objects.map(toModel);
    }
}