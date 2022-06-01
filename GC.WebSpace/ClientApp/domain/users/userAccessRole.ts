export class UserAccessRole {
    constructor(
        public readonly id: string,
        public readonly title: string
    ) { }
}

export const mapToUserAccessRole = (value: any) => {
    return new UserAccessRole(value.id, value.title);
}

export const mapToUserAccessRoles = (values: any[]) => {
    return values.map(mapToUserAccessRole);
}