import { UserAccessRole } from "../users/userAccessRole";


export class AccessPolicyPermission {
    constructor(
        public readonly userAccessRole: UserAccessRole
    ) { }
}
