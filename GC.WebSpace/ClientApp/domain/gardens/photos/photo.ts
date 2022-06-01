export class Photo {
    constructor(
        public readonly id: string,
        public readonly path: string
    ) { }
}

export namespace Photo {
    export function toModel(data: any): Photo {
        return new Photo(data.id, data.path);
    }

    export function toModels(data: any[]): Photo[] {
        return data.map(toModel);
    }
}