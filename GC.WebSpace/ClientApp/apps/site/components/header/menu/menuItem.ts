export class MenuItem {
    constructor(
        public readonly title: string,
        public readonly url: string,
    ) { }
}

export class ParentMenuItem {
    constructor(
        public readonly title: string,
        public readonly items: MenuItem[]
    ) { }
}