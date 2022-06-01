import { ForeignContactType } from "./foreignContactType";

export class ForeignContact {
    constructor(
        public readonly id: string,
        public readonly type: ForeignContactType,
        public readonly firstName: string,
        public readonly middleName: string,
        public readonly lastName: string,
        public readonly phoneNumber: string
    ) { }

    get fullName() {
        return `${this.lastName} ${this.firstName} ${this.middleName}`;
    }
}

export namespace ForeignContact {
    export function toModel(object: any): ForeignContact {
        return new ForeignContact(object.id, object.type, object.firstName, object.middleName, object.lastName, object.phoneNumber);
    }

    export function toModels(objects: any[]): ForeignContact[] {
        return objects.map(toModel);
    }
}