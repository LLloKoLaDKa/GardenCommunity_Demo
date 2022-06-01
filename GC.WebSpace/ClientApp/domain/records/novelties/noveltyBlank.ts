import { decodedTextSpanIntersectsWith } from "typescript";
import { Novelty } from "./novelty";

export class NoveltyBlank {
    constructor(
        public id: string | null,
        public title: string | null,
        public description: string | null,
        public publishDate: Date | null,
        public image: string | null
    ) { }

    public static empty = () => {
        return new NoveltyBlank(null, null, null, null, null);
    }

    public static create = (novelty: Novelty): NoveltyBlank => {
        return new NoveltyBlank(novelty.id, novelty.title, novelty.description, novelty.publishDate, novelty.image);
    }
}