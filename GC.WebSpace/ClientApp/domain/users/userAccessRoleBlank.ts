import { AccessPolicy } from "../accesspolicies/accessPolicy";

export class UserAccessRoleBlank {
    constructor(
        public id: string | null,
        public title: string,
        public accessPolicies: AccessPolicy[]
    ) { }

    public static getDefault(): UserAccessRoleBlank {
        return new UserAccessRoleBlank(null, "", []);
    }

    public static create(value: any): UserAccessRoleBlank {
        return new UserAccessRoleBlank(value.id, value.title, [])
    }
}
