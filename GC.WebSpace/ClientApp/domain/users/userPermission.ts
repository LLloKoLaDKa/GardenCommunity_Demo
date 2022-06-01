export class UserPermission{
    constructor(
        public readonly id: string,
        public readonly accessRoleId: string
    ){}
}

export const mapToPermission = (value: any): UserPermission => {
    return new UserPermission(value.id, value.accessRoleId);
}

export const mapToPermissions = (values: any[]): UserPermission[] => {
    return values.map(mapToPermission);
}
