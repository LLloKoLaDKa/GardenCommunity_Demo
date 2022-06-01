import { AdType } from "./adType";

export class Ad {
    constructor(
        public readonly id: string,
        public readonly type: AdType,
        public readonly title: string,
        public readonly description: string,
        public readonly firstName: string,
        public readonly middleName: string | null,
        public readonly lastName: string,
        public readonly phoneNumber: string,
        public readonly publishDate: Date | null,
        public readonly image: string | null
    ) { }

    public get initials() {
        return `${this.lastName} ${this.firstName[0].toUpperCase() + '.'} ${(this.middleName == null || this.middleName == undefined) ? `` : `${this.middleName[0]}` + '.'}`;
    }

    public get fullname() {
        return `${this.lastName} ${this.firstName} ${(this.middleName == null || this.middleName == undefined) ? '' : this.middleName}`;
    }

    public get shortDescription() {
        return this.description.substring(0, 90) + "...";
    }
}

export namespace Ad {
    export function toModel(object: any): Ad {
        return new Ad(object.id, object.type, object.title, object.description, object.firstName, object.middleName, object.lastName,
            object.phoneNumber, object.publishDate == null ? null : new Date(object.publishDate), object.image);
    }

    export function toModels(objects: any[]): Ad[] {
        return objects.map(toModel);
    }
}