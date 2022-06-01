import React, { Component } from "react";
import { mapToUserAccessRoles, UserAccessRole } from "../../../domain/users/userAccessRole";
import { mapToPermissions, UserPermission } from "../../../domain/users/userPermission";
import { UsersProvider } from "../../../domain/users/usersProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyMainButton } from "../../../shared/myButton/myMainButton";
import { AuthLinks, InfrastructureLinks } from "../../../tools/links";
import { addErrorNotification } from "../../../tools/notifications";
import styles from '../content/authorization.module.scss';

interface IProps { }

interface IState {
    permissions: UserPermission[],
    userAccessRoles: UserAccessRole[]
}

export class Authorization extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        const payload = (window as any).payload;
        const permissions = mapToPermissions(payload.userPermissions as UserPermission[]);
        const userAccessRoles = mapToUserAccessRoles(payload.userAccessRoles as UserAccessRole[]);

        this.state = {
            permissions,
            userAccessRoles
        }
    }

    choosePermission = async (permission: UserPermission) => {
        BlockUi.blockAsync(async () => {
            const result = await UsersProvider.authorize(permission);
            if (!result.isSuccess) return addErrorNotification(result.errors[0].message);

            window.location.href = InfrastructureLinks.adminHome;
        });
    }

    logOut = () => window.location.href = AuthLinks.logOut

    renderPermission = (permission: UserPermission) => {
        const role = this.state.userAccessRoles.find(uar => uar.id == permission.accessRoleId);

        return <React.Fragment key={permission.id}>
            <div className={styles.permission} onClick={() => this.choosePermission(permission)}>
                {role?.title ?? 'Unknown role'}
            </div>
        </React.Fragment>
    }

    render() {
        const { permissions } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.block}>
                    <h1>Выбор роли</h1>

                    <div className={styles.roles}>
                        {
                            permissions.map(p => this.renderPermission(p))
                        }
                    </div>

                    <MyMainButton text='Выйти' onClick={this.logOut} />
                </div>
            </div>
        )
    }
}
