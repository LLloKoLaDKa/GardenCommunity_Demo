export class Gardener {
    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly middleName: string | null,
        public readonly lastName: string,
        public readonly sectorId: string
    ) { }

    public initials(): string {
        return `${this.lastName} ${this.firstName[0]}.${this.middleName == null ? '' : ` ${this.middleName[0]}.`}`;
    }

    public fullName(): string {
        return `${this.lastName} ${this.firstName} ${this.middleName == null ? '' : ` ${this.middleName}`}`;
    }
}

export namespace Gardener {
    export function toModel(value: any) {
        return new Gardener(value.id, value.firstName, value.middleName, value.lastName, value.sectorId);
    }

    export function toModels(values: any[]) {
        return values.map(toModel);
    }
}