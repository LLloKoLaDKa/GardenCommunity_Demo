import { EmergencyContactType } from "./emergencyContactType";

export class EmergencyContact {
    constructor(
        public readonly id: string,
        public readonly type: EmergencyContactType,
        public readonly cityPhone: string,
        public readonly mobilePhone: string
    ) { }
}

export namespace EmergencyContact {
    export function toModel(object: any): EmergencyContact {
        return new EmergencyContact(object.id, object.type, object.cityPhone, object.mobilePhone);
    }

    export function toModels(objects: any[]): EmergencyContact[] {
        return objects.map(toModel)
    }
}