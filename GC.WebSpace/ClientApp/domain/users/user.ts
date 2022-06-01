export class User{
    constructor(
        public readonly id: string,
        public readonly login: string
    ){}
}

export const mapToUser = (value: any) : User =>{
    return new User(value.id, value.login)
}

export const mapToUsers = (values: any[]) : User[] =>{
    return values.map(mapToUser)
}
