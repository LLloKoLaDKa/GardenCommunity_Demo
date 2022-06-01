export class Appeal {
    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phoneNumber: string,
        public readonly title: string,
        public readonly message: string,
        public readonly email: string | null,
        public readonly date: Date,
        public readonly isViewed: boolean,
    ) { }

    public get fullName() {
        return `${this.lastName} ${this.firstName}`;
    }
}

export const mapToAppeal = (data: any) => {
    return new Appeal(data.id, data.firstName, data.lastName, data.phoneNumber, data.title, data.message,
        data.email, new Date(data.date), data.isViewed);
}

export const mapToAppeals = (data: any[]) => {
    return data.map(mapToAppeal);
}