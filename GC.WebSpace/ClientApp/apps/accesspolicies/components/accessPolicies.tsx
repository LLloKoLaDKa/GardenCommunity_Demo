import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { Component } from "react";
import { mapToAccessPolicies, mapToAccessPolicy } from "../../../domain/accesspolicies/accessPolicy";
import { AccessPolicyProvider } from "../../../domain/accesspolicies/accessPolicyProvider";
import { Policy } from "../../../domain/accesspolicies/policy";
import { UserAccessRole } from "../../../domain/users/userAccessRole";
import { UserAccessRoleBlank } from "../../../domain/users/userAccessRoleBlank";
import { UsersProvider } from "../../../domain/users/usersProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyMainButton } from '../../../shared/myButton/myMainButton';
import { MyConfirm } from '../../../shared/myConfirm/myConfirm';
import { CheckBox } from '../../../shared/myinputs/checkBox/checkBox';
import NewSelectBox from '../../../shared/myinputs/selectBox/newSelectBox';
import { Option } from '../../../shared/myinputs/selectBox/option';
import { TextBox } from '../../../shared/myinputs/textBox/textBox';
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";
import { Header } from "../../root/header";
import styles from "../content/accessPolicies.module.scss";
import "../content/accesspolicies.scss";

interface IProps { }

interface IState {
    userAccessRoles: UserAccessRole[],
    accessPolicies: Policy[],
    policyBlocks: string[],
    searchText: string,

    roleOptions: Option<UserAccessRole>[],
    selectedAccessRole: Option<UserAccessRole> | null,

    editingAccessRole: UserAccessRoleBlank | null,
    deletableAccessRole: UserAccessRoleBlank | null,
    isNewRole: boolean
}

export class AccessPolicies extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            userAccessRoles: [],
            accessPolicies: [],
            policyBlocks: [],
            searchText: "",

            roleOptions: [],
            selectedAccessRole: null,

            editingAccessRole: null,
            deletableAccessRole: null,
            isNewRole: false
        }
    }

    componentDidMount = async () => {
        await this.loadRoles();
    }

    loadRoles = async () => {
        await BlockUi.blockAsync(async () => {
            let userAccessRoles = await UsersProvider.getUserAccessRoles();
            let accessPolicies = await AccessPolicyProvider.getAccessPolicies();
            let policyBlocks = accessPolicies.map(ap => ap.blockDisplayName).filter((e, i, a) => a.indexOf(e) == i);

            this.unmarkToEditingRole();
            const roleOptions = userAccessRoles.map(uas => new Option(uas.title, uas))

            this.setState({ userAccessRoles, accessPolicies, policyBlocks, roleOptions, editingAccessRole: null, selectedAccessRole: null });
        })
    }

    changeSelectedUserAccessRole = (selectedRole: Option<UserAccessRole> | null) => {
        let { selectedAccessRole, userAccessRoles } = this.state;

        BlockUi.blockAsync(async () => {
            if (selectedRole == null) {
                this.setState({ selectedAccessRole: null, editingAccessRole: null });
                return;
            }

            selectedAccessRole = selectedRole;

            let editingAccessRole = UserAccessRoleBlank.create(selectedRole.value);
            editingAccessRole.accessPolicies = mapToAccessPolicies(
                await AccessPolicyProvider.getAccessPoliciesByUserAccessRole(selectedRole.value.id)
            );

            this.setState({ selectedAccessRole, editingAccessRole });
        })
    }

    changeAccessPolicies = (value: boolean, key: string) => {
        let editingAccessRole = this.state.editingAccessRole;
        if (editingAccessRole == null) return;

        let policy = this.state.accessPolicies.find(ap => ap.key == key)
        if (policy == undefined) return;

        const accessPolicy = mapToAccessPolicy(policy);
        if (value) {
            editingAccessRole.accessPolicies.push(accessPolicy)
        } else {
            let index = editingAccessRole.accessPolicies.indexOf(accessPolicy);
            editingAccessRole.accessPolicies.splice(index, 1)
        }

        this.setState({ editingAccessRole });
    }

    changeAccessRoleTitle = (value: string) => {
        let editingAccessRole = this.state.editingAccessRole;
        if (editingAccessRole == null) return;

        editingAccessRole.title = value;
        this.setState({ editingAccessRole });
    }

    changeSearchText = (value: string) => {
        let searchText = this.state.searchText;
        searchText = value;

        this.setState({ searchText });
    }

    filterBlocks = (block: string): boolean => {
        let searchText = this.state.searchText.toLocaleLowerCase();
        block = block.toLocaleLowerCase();

        if (block.includes(searchText)) return true;

        if (this.state.accessPolicies.some(ap => ap.blockDisplayName.toLocaleLowerCase() == block && ap.display.toLocaleLowerCase().includes(searchText)))
            return true;

        return false;
    }

    filterAccessPolicies = (policy: Policy, block: string): boolean => {
        let searchText = this.state.searchText.toLocaleLowerCase();
        if (policy.blockDisplayName != block) return false;
        if (policy.blockDisplayName.toLocaleLowerCase().includes(searchText)) return true;

        return policy.display.toLowerCase().includes(searchText)
    }

    markToEditingRole = (editingAccessRole: UserAccessRoleBlank) => {
        // TODO проверить чтобы селект был закрыт при новой роли и сделать кнопку отмены
        if (editingAccessRole.id == null) {
            return this.setState({ editingAccessRole, selectedAccessRole: null, isNewRole: true });
        }
        this.setState({ editingAccessRole })
    }
    unmarkToEditingRole = () => this.setState({ editingAccessRole: null, isNewRole: false })

    markToDeleteRole = (deletableAccessRole: UserAccessRoleBlank) => this.setState({ deletableAccessRole });
    unmarkToDeleteRole = () => this.setState({ deletableAccessRole: null });

    saveAccessRole = () => {
        BlockUi.blockAsync(async () => {
            if (this.state.editingAccessRole == null) {
                addErrorNotification("Выберите роль для изменения");
                return;
            }

            const result = await UsersProvider.saveUserAccessRole(this.state.editingAccessRole);
            if (!result.isSuccess) {
                addErrorNotification(result.errors[0].message);
                return;
            }

            addSuccessNotification("Роль успешно сохранена");
            await this.loadRoles();
        })
    }

    remove = async () => {
        const { deletableAccessRole } = this.state;
        if (deletableAccessRole == null) return;

        BlockUi.blockAsync(async () => {
            let role = this.state.editingAccessRole;
            if (role == null) return;
            if (role.id == null) return;

            const result = await UsersProvider.removeUserAccessRole(role.id)
            if (!result.isSuccess) {
                addErrorNotification(result.errors[0].message);
                return;
            }

            addSuccessNotification("Роль удалена!");
            await this.loadRoles();
        });
    }

    render() {
        const {
            userAccessRoles,
            accessPolicies,
            policyBlocks,
            searchText,
            roleOptions,
            selectedAccessRole,
            editingAccessRole,
            deletableAccessRole,
            isNewRole
        } = this.state;

        return (
            <>
                <Header
                    headerTitle="Роли пользователей"
                    buttonContent='Добавить'
                    buttonIcon={<AddCircleIcon />}
                    buttonOnClick={() => this.markToEditingRole(UserAccessRoleBlank.getDefault())}
                />

                <p>Для изменения выберите необходимую роль пользователей и обозначьте нужные права для неё, затем сохраните изменения.</p>

                <div className={styles.container}>
                    <div className={styles.controls}>
                        <NewSelectBox
                            label='Роль пользователя'
                            options={roleOptions}
                            value={selectedAccessRole}
                            onChange={this.changeSelectedUserAccessRole}
                            disabled={editingAccessRole != null && editingAccessRole.id == null}
                        />

                        <TextBox
                            required
                            disabled={editingAccessRole == null}
                            label='Название роли'
                            value={editingAccessRole?.title ?? ''}
                            onChange={this.changeAccessRoleTitle}
                        />

                        <MyMainButton
                            text='Сохранить'
                            onClick={this.saveAccessRole}
                            disabled={editingAccessRole == null}
                        />

                        {
                            editingAccessRole != null &&
                            <MyMainButton
                                text={editingAccessRole.id == null ? 'Отменить добавление' : 'Удалить'}
                                color='error'
                                onClick={editingAccessRole.id == null ? this.unmarkToEditingRole : this.saveAccessRole}
                            />
                        }
                    </div>

                    <div className={styles.policies}>
                        <TextBox
                            label='Поиск по блокам или по политикам доступа'
                            onChange={this.changeSearchText}
                            value={searchText}
                            disabled={editingAccessRole == null}
                        />

                        {
                            policyBlocks.sort().filter(block => this.filterBlocks(block)).map(block =>
                                <fieldset className="access-policies-block" key={block}>
                                    <legend>{block}</legend>
                                    {
                                        accessPolicies.filter(ap => this.filterAccessPolicies(ap, block)).map(ap =>
                                            <CheckBox
                                                key={ap.key}
                                                disabled={editingAccessRole == null}
                                                label={ap.display}
                                                checked={editingAccessRole == null ? false : editingAccessRole.accessPolicies.some(p => p == ap.key)}
                                                onChange={(value: boolean) => this.changeAccessPolicies(value, ap.key)}
                                            />
                                        )
                                    }
                                </fieldset>
                            )
                        }
                    </div>
                </div>

                {/* <div className="d-flex">
                    <div className="select-width">
                        <SelectBox
                            options={userAccessRoles.map(uas => new Option(uas.title, uas))}
                            value={selectedAccessRole}
                            onChange={this.changeSelectedUserAccessRole}
                        />
                    </div>

                    <MainButton onClick={this.saveAccessRole} disabled={editingAccessRole == null} className="mr-1">
                        Сохранить
                    </MainButton>

                    {
                        editingAccessRole != null &&
                        <div className="d-flex">
                            <div className="title-editor">
                                <label>Наименование</label>
                                <TextInput
                                    value={editingAccessRole?.title}
                                    onChange={this.changeAccessRoleTitle}
                                    placeholder="Введите..."
                                />
                            </div>

                            {
                                editingAccessRole.id != null &&
                                <MainButton onClick={() => this.markToDeleteRole(editingAccessRole)} className="delete-button ml-2">
                                    Удалить
                                </MainButton>
                            }
                        </div>
                    }
                </div>

                {
                    editingAccessRole != null &&
                    <>
                        <InputForm
                            type='text'
                            onChange={this.changeSearchText}
                            value={searchText}
                            label='Поиск по блокам или по политикам доступа'
                            placeholder="Ключевое слово"
                        />

                        {
                            policyBlocks.filter(block => this.filterBlocks(block)).map(block =>
                                <fieldset className="access-policies-block" key={block}>
                                    <legend>{block}</legend>
                                    {
                                        accessPolicies.filter(ap => this.filterAccessPolicies(ap, block)).map(ap =>
                                            <CheckBox
                                                key={ap.key}
                                                title={ap.display}
                                                checked={editingAccessRole == null ? false : editingAccessRole.accessPolicies.some(p => p == ap.key)}
                                                onChange={(value: boolean) => this.changeAccessPolicies(value, ap.key)}
                                            />
                                        )
                                    }
                                </fieldset>
                            )
                        }
                    </>
                } */}
                {
                    deletableAccessRole != null &&
                    <MyConfirm
                        title={`Вы уверены что хотите удалить роль '${deletableAccessRole.title}'?`}
                        onAccept={this.remove}
                        onClose={this.unmarkToDeleteRole}
                    />
                }
            </>
        )
    }
}
