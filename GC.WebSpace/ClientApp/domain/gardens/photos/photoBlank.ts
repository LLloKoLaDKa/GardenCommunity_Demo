export class PhotoBlank {
    constructor(
        public id: string | null,
        public image: string | null
    ) { }

    public static empty = (): PhotoBlank => {
        return new PhotoBlank(null, null);
    }
}   