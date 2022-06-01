import { HttpClient } from '../../tools/httpClient';
import { AuthLinks, UserAccessRoleLinks, UserLinks } from '../../tools/links';
import { PagedResult } from '../../tools/pagedResult';
import { mapToResult, Result } from '../../tools/result';
import { mapToUser, User } from './user';
import { mapToUserAccessRole, mapToUserAccessRoles, UserAccessRole } from './userAccessRole';
import { UserAccessRoleBlank } from './userAccessRoleBlank';
import { UserBlank } from './userBlank';
import { mapToPermissions, UserPermission } from './userPermission';

export class UsersProvider {
    public static async saveUser(userBlank: UserBlank): Promise<Result<null>> {
        const result = await HttpClient.postAsync(UserLinks.save, userBlank);
        return mapToResult(result);
    }

    public static async saveUserAccessRole(userAccessRoleBlank: UserAccessRoleBlank): Promise<Result<string>> {
        const result = await HttpClient.postAsync(UserAccessRoleLinks.save, userAccessRoleBlank);
        return mapToResult(result);
    }

    public static async getPagedUsers(page: number, count: number): Promise<PagedResult<User>> {
        const result = await HttpClient.getAsync(UserLinks.getPaged, { page, count });
        return new PagedResult((result.values as any[]).map(x => mapToUser(x)), result.totalRows);
    }

    public static async removeUser(userId: string): Promise<Result<null>> {
        const result = await HttpClient.postAsync(UserLinks.remove, userId);
        return mapToResult(result);
    }

    public static async removeUserAccessRole(roleId: string): Promise<Result<null>> {
        const result = await HttpClient.postAsync(UserAccessRoleLinks.remove, roleId);
        return mapToResult(result);
    }

    public static async getUserPermissions(userId: string): Promise<UserPermission[]> {
        const permissions = await HttpClient.getAsync(UserLinks.getPermissions, { userId });
        return mapToPermissions(permissions);
    }

    public static async getUserAccessRoleById(userId: string): Promise<UserAccessRole> {
        const userAccessRole = await HttpClient.getAsync(UserAccessRoleLinks.getById, { userId });
        return mapToUserAccessRole(userAccessRole);
    }

    public static async getUserAccessRoles(): Promise<UserAccessRole[]> {
        const roles = await HttpClient.getAsync(UserAccessRoleLinks.getAll);
        return mapToUserAccessRoles(roles);
    }

    public static async logIn(login: string, password: string): Promise<Result<string | null>> {
        const result = await HttpClient.postAsync(AuthLinks.login, { login, password });

        return mapToResult(result);
    }

    public static async logOut() {
        await HttpClient.getAsync(AuthLinks.logOut);
    }

    public static async authorize(permission: UserPermission): Promise<Result<any>> {
        const result = await HttpClient.postAsync(AuthLinks.authorize, permission);
        return mapToResult(result);
    }

    public static async changeTokenPermission(): Promise<Result<string | null>> {
        const result = await HttpClient.postAsync(AuthLinks.changeTokenPermission, null);
        return mapToResult(result);
    }
}
