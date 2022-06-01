import { UserPermission } from "./userPermission";

export class UserPermissionBlank{
    constructor(
        public id: string | null,
        public accessRoleId: string | null
    ){}

    public static get empty(): UserPermissionBlank{
        return new UserPermissionBlank(null, null);
    }

    public static create(value: UserPermission): UserPermissionBlank {
        return new UserPermissionBlank(value.id, value.accessRoleId);
    }
}
