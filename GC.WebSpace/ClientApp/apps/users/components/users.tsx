import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { Component } from 'react';
import { User } from '../../../domain/users/user';
import { UserBlank } from '../../../domain/users/userBlank';
import { UsersProvider } from '../../../domain/users/usersProvider';
import { BlockUi } from '../../../shared/blockUi/blockUi';
import { MyConfirm } from '../../../shared/myConfirm/myConfirm';
import { Pagination } from '../../../shared/pagination/pagination';
import { PaginationParameters } from '../../../shared/pagination/paginationParameters';
import { addErrorNotification, addSuccessNotification } from '../../../tools/notifications';
import { Header } from '../../root/header';
import { UsersEditorModal } from './usersEditorModal';

interface IProps { }

interface IState {
    users: User[];
    pageSize: number;
    page: number;
    totalRows: number;
    editingUser: UserBlank | null;
    deletableUser: User | null
}

export class Users extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);

        this.state = {
            users: [],
            pageSize: 10,
            page: 1,
            totalRows: 0,
            editingUser: null,
            deletableUser: null
        }
    }

    async componentDidMount() {
        await this.loadUsersPaged({});
    }

    loadUsersPaged = async ({
        page = this.state.page,
        pageSize = this.state.pageSize
    }: PaginationParameters) => {
        await BlockUi.blockAsync(async () => {
            const { values: users, totalRows } = await UsersProvider.getPagedUsers(page ?? this.state.page, pageSize ?? this.state.pageSize);

            this.setState({ users, totalRows, page, pageSize });
        });
    }

    changePageSize = (pageSize: number) => this.loadUsersPaged({ pageSize, page: 1 });
    changePage = (page: number) => this.loadUsersPaged({ page });

    removeUser = async () => {
        const { deletableUser } = this.state;

        BlockUi.blockAsync(async () => {
            if (deletableUser == null) return;

            const result = await UsersProvider.removeUser(deletableUser.id);
            if (!result.isSuccess) {
                addErrorNotification(result.errors[0].message);
                return;
            }

            await this.loadUsersPaged({ page: 1 });
            addSuccessNotification("Пользователь успешно удалён!", "Удаление");
        });
    }

    markToAddUser = () => this.setState({ editingUser: UserBlank.getDefault() });
    markToEditUser = (user: User) => this.setState({ editingUser: UserBlank.create(user) });
    unmarkToEditingUser = async (isEdited: boolean) => {
        if (isEdited) this.loadUsersPaged({ page: 1 });

        this.setState({ editingUser: null })
    }

    markToDeleteUser = (deletableUser: User) => this.setState({ deletableUser });
    unmarkToDeleteUser = () => this.setState({ deletableUser: null });

    render() {
        const {
            users,
            pageSize,
            page,
            totalRows,
            editingUser,
            deletableUser
        } = this.state

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            total={totalRows}
            changePage={this.changePage}
            changePageSize={this.changePageSize} />;

        return <>
            <Header
                headerTitle="Пользователи"
                buttonContent='Добавить'
                buttonIcon={<AddCircleIcon />}
                buttonOnClick={this.markToAddUser}
            />

            {pages}

            <div className='overflow-auto'>
                <table>
                    <thead>
                        <tr>
                            <th>Логин</th>
                            <th>Управление</th>
                        </tr>
                    </thead>

                    <tbody className="transition">
                        {
                            users.length == 0
                                ?
                                <tr>
                                    <td colSpan={2}>Нет данных для отображения</td>
                                </tr>
                                :
                                users.map(u =>
                                    <tr key={u.id}>
                                        <td className="w-25">{u.login}</td>

                                        <td className="nowrap w-25">
                                            <i className="fa fa-pencil-alt pointer hover mr-2" aria-hidden="true" onClick={() => this.markToEditUser(u)}></i>
                                            <i className="fa fa-trash pointer hover" aria-hidden="true" onClick={() => this.markToDeleteUser(u)}></i>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>

            {
                editingUser != null &&
                <UsersEditorModal
                    defaultUser={editingUser}
                    onClose={this.unmarkToEditingUser}
                />
            }

            {
                deletableUser != null &&
                <MyConfirm
                    title={`Вы уверены, что хотите удалить пользователя '${deletableUser.login}'?`}
                    onClose={this.unmarkToDeleteUser}
                    onAccept={this.removeUser}
                />
            }
        </>
    }
}
