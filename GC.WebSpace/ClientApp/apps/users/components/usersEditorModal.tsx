import React, { Component } from 'react';
import SystemUser from '../../../domain/users/systemUser';
import { UserAccessRole } from '../../../domain/users/userAccessRole';
import { UserBlank } from '../../../domain/users/userBlank';
import { UserPermissionBlank } from '../../../domain/users/userPermissionBlank';
import { UsersProvider } from '../../../domain/users/usersProvider';
import { BlockUi } from '../../../shared/blockUi/blockUi';
import { MultiSelectBox } from '../../../shared/myinputs/multiSelectBox/multiSelectBox';
import PasswordBox from '../../../shared/myinputs/passwordBox/passwordBox';
import { TextBox } from '../../../shared/myinputs/textBox/textBox';
import { CustomModal } from '../../../shared/mymodal/customModal';
import { ModalButton } from '../../../shared/mymodal/modalButton';
import { ModalErrorStorage } from '../../../shared/mymodal/modalErrorStorages/modalErrorStorage';
import { AuthLinks } from '../../../tools/links';
import { addSuccessNotification } from '../../../tools/notifications';

interface IProps {
    defaultUser: UserBlank;
    onClose: (isEdited: boolean) => void;
}

interface IState {
    editingUser: UserBlank;
    userAccessRoles: UserAccessRole[];
    selectedRoles: UserAccessRole[];
}

export class UsersEditorModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editingUser: props.defaultUser,
            userAccessRoles: [],
            selectedRoles: []
        }
    }

    componentDidMount() {
        BlockUi.blockAsync(async () => {
            const userAccessRoles = await UsersProvider.getUserAccessRoles();
            if (this.state.editingUser.id == null) {
                this.setState({ userAccessRoles });
                return;
            }

            const permissions = await UsersProvider.getUserPermissions(this.state.editingUser.id);
            let editingUser = this.state.editingUser;
            editingUser.permissions = permissions;

            let permissionRoles = permissions.map(p => p.accessRoleId)
            let selectedRoles = userAccessRoles.filter(role => permissionRoles.includes(role.id));

            await this.setState({ userAccessRoles, editingUser, selectedRoles })
        });
    }

    saveUser = async () => {
        const { editingUser } = this.state;

        const result = await UsersProvider.saveUser(editingUser);
        if (!result.isSuccess) {
            return ModalErrorStorage.setError(result.errors[0].message);
        }

        if (editingUser.id == SystemUser.id) {
            await UsersProvider.logOut();
            window.location.href = AuthLinks.autentication;
            addSuccessNotification("Текущий пользователь был изменён, произведён автоматический выход.");
            return;
        }


        await this.props.onClose(true);
        addSuccessNotification("Пользователь успешно сохранён!", "Работа с пользователем");
        ModalErrorStorage.setNullError();
    }

    changeLogin = (login: string) => {
        let userBlank = this.state.editingUser;
        userBlank.login = login.replace(' ', '');

        this.setState({ editingUser: userBlank });
    }

    changePassword = (password: string) => {
        let userBlank = this.state.editingUser;
        userBlank.password = password.replace(' ', '');
        userBlank.passwordWasEdited = true;
        console.log(userBlank);

        this.setState({ editingUser: userBlank });
    }

    changeRePassword = (rePassword: string) => {
        let userBlank = this.state.editingUser;
        userBlank.rePassword = rePassword.replace(' ', '');

        this.setState({ editingUser: userBlank });
    }

    changeRoles = (roleIds: string[]): void => {
        let editingUser = this.state.editingUser;
        editingUser.permissions = roleIds.map(roleId => new UserPermissionBlank(null, roleId))
        const selectedRoles = this.state.userAccessRoles.filter(r => roleIds.some(id => id == r.id));

        this.setState({ selectedRoles, editingUser })
    }

    cancelChangesPassword = () => {
        let editingUser = this.state.editingUser;
        editingUser.passwordWasEdited = false;
        editingUser.password = "";
        editingUser.rePassword = "";

        this.setState({ editingUser });
    }

    render() {
        const { editingUser, userAccessRoles, selectedRoles } = this.state;
        const { onClose } = this.props;

        return (
            <CustomModal
                headerText={editingUser.id == null ? 'Создание пользователя' : 'Редактирование пользователя'}
                size={400}
                onClose={() => onClose(false)}
                buttons={[
                    new ModalButton('Сохранить', 'primary', this.saveUser)
                ]}
            >
                <TextBox
                    required
                    value={editingUser.login}
                    label='Логин пользователя'
                    onChange={this.changeLogin}
                />

                <MultiSelectBox
                    label='Роли пользователя'
                    options={userAccessRoles.map(role => new Option(role.title, role.id))}
                    values={selectedRoles.map(sr => sr.id)}
                    onChange={this.changeRoles}
                />

                <PasswordBox
                    value={editingUser.password}
                    label='Пароль пользователя'
                    onChange={this.changePassword}
                />

                <PasswordBox
                    value={editingUser.rePassword}
                    label='Повторите пароль пользователя'
                    onChange={this.changeRePassword}
                />

                {/* <InputForm
                    type='multi-select'
                    id='multi-select'
                    label='Роль пользователя'
                    onChange={this.changeRoles}
                    placeholder="Выберите роль"
                    options={userAccessRoles.map(role => new Option(role.title, role))}
                    values={selectedRoles}
                /> */}
            </CustomModal>
        )
    }
}
