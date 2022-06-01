export class AppealBlank {
    constructor(
        public id: string | null,
        public firstName: string | null,
        public lastName: string | null,
        public phoneNumber: string | null,
        public title: string | null,
        public message: string | null,
        public email: string | null,
        public date: Date | null,
    ) { }

    public static empty = () => {
        return new AppealBlank(null, null, null, null, null, null, null, null);
    }
}