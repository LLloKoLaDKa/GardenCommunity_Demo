import { User } from "./user";
import { UserPermissionBlank } from "./userPermissionBlank";

export class UserBlank {
    constructor(
        public id: string | null,
        public login: string,
        public password: string,
        public rePassword: string,
        public passwordWasEdited: boolean,
        public permissions: UserPermissionBlank[]
    ) { }

    public static getDefault(): UserBlank {
        return new UserBlank(null, '', '', '', false, []);
    }

    public static create(user: User): UserBlank {
        return new UserBlank(user.id, user.login, '', '', false, []);
    }

    public get isValid() : boolean{
        if (this.id == null || this.password != ""){
            return  this.login != null && this.login != "" &&
                    this.password != null && this.password != "" &&
                    this.rePassword != null && this.rePassword != "" &&
                    this.permissions != null && this.permissions.length > 0
        } else{
            return this.login != null && this.login != "" &&
            this.permissions != null && this.permissions.length > 0

        }
    }

}
