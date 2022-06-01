import { AccessPolicy } from "../accesspolicies/accessPolicy";
import { UserPermission } from "./userPermission";

export default class SystemUser {
    public static id: string;
    public static login: string;
    public static permission: UserPermission;
    public static hasOtherPermissions: boolean;
    public static availableAccessPolicies: string[]

    public static loadSystemUser() {
        const systemUser = (window as any).systemUser;

        if (systemUser != null) {
            SystemUser.id = systemUser.id;
            SystemUser.login = systemUser.login;
            SystemUser.permission = systemUser.permission;
            SystemUser.hasOtherPermissions = systemUser.hasOtherPermissions;
            SystemUser.availableAccessPolicies = systemUser.availableAccessPolicies;
        }
    }

    public static hasAccess = (accessPolicy: AccessPolicy) => {
        return SystemUser.availableAccessPolicies.includes(accessPolicy);
    }
}

SystemUser.loadSystemUser();
