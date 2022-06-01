
export class Novelty {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly publishDate: Date | null,
        public readonly image: string | null
    ) { }

    public get shortDescription() {
        return this.description.substring(0, 90) + "...";
    }
}

export namespace Novelty {
    export function toModel(object: any): Novelty {
        return new Novelty(object.id, object.title, object.description, object.publishDate == null ? null : new Date(object.publishDate), object.image);
    }

    export function toModels(objects: any[]): Novelty[] {
        return objects.map(toModel);
    }
}