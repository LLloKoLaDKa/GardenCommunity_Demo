import React, { Component } from 'react';
import { SidebarItem } from '../../domain/sidebar/sidebarItem';
import SidebarLinksTree from '../../domain/sidebar/sidebarLinksTree';
import SystemUser from '../../domain/users/systemUser';
import { UsersProvider } from '../../domain/users/usersProvider';
import { AuthLinks } from '../../tools/links';
import { addErrorNotification } from '../../tools/notifications';
import { BlockUi } from '../blockUi/blockUi';
import Logo from './panel_logo.svg';
import styles from './sidebar.module.scss';
interface IProps {
    className?: string
}

interface IState {
    userAccessRole: string,
    className: string | null,
    showMenu: boolean
}

export class SideBar extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            userAccessRole: "",
            className: null,
            showMenu: false,
        }
    }

    componentDidMount() {
        BlockUi.blockAsync(async () => {
            const userAccessRole = await UsersProvider.getUserAccessRoleById(SystemUser.permission.accessRoleId);

            this.setState({ userAccessRole: userAccessRole.title });
        });
    }

    renderMenuItem(sidebarItem: SidebarItem) {
        return (
            <a key={sidebarItem.id}
                className={styles.sidebar_item}
                href={sidebarItem.url}
                title={sidebarItem.text}
            >
                <i className={`fa-fw ${sidebarItem.cssClassName}`}></i> {sidebarItem.text}
            </a>
        );
    }

    changePermission = async () => {
        var result = await UsersProvider.changeTokenPermission();

        if (!result.isSuccess) {
            addErrorNotification(result.errors[0].message);
            return;
        }

        window.location.href = AuthLinks.changePermission;
    }

    logOut = async () => {
        await UsersProvider.logOut();
        window.location.href = AuthLinks.autentication;
    }

    render() {

        return <>
            <nav className={`${styles.sidebar} ${this.state.showMenu ? styles.show : ''}`}>
                <div className={styles.panel_logo}>
                    <Logo />
                </div>

                <div className={styles.sidebar_items}>
                    {SidebarLinksTree.items.map(item => this.renderMenuItem(item))}
                </div>

                <div className={styles.user}>
                    <div className={styles.user_name}>
                        {SystemUser.login}
                    </div>

                    <div className={styles.exit} onClick={this.logOut}>
                        <i className="fa fa-sign-out-alt"></i>
                    </div>
                </div>
            </nav>

            <div className={styles.mobile_bar}>
                <div className={styles.box} onClick={(event) => this.setState(prevState => ({ showMenu: !prevState.showMenu }))}>
                    <div className={`${styles.hamburger} ${this.state.showMenu ? styles.animate : ''}`}></div>
                </div>

                <div className={styles.box}>
                    <Logo />
                </div>

                <div className={`${styles.exit} ${styles.box}`} onClick={this.logOut}>
                    <i className="fa fa-sign-out-alt"></i>
                </div>
            </div>
        </>
    }
}