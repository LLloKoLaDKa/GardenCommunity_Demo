import React from "react";
import history from '../../../../tools/history';
import { id } from '../../../../tools/id/id';
import { SiteLinks } from "../../../../tools/links";
import styles from '../../content/header.module.scss';
import { MenuItem, ParentMenuItem as ExtendedMenuItem, ParentMenuItem } from "./menu/menuItem";

const menu = [
    new MenuItem("Главная", SiteLinks.homePage),
    new MenuItem("Новости", SiteLinks.newsPage),
    new MenuItem("Объявления", SiteLinks.adsPage),
    new ExtendedMenuItem("Садоводство", [
        new MenuItem("Информация", SiteLinks.information),
        new MenuItem("Продажи участков", SiteLinks.sectorSales),
        new MenuItem("Задолженности", SiteLinks.credits),
        new MenuItem("Фотогалерея", SiteLinks.gallery)
    ]),
    new MenuItem("Контакты", SiteLinks.contactsPage),
]

interface IProps { }

interface IState {
    showMenu: boolean
}

export class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            showMenu: false
        }
    }

    renderMenuItem = (menuItem: MenuItem | ParentMenuItem): JSX.Element => {
        if (menuItem instanceof MenuItem) return <React.Fragment key={id()}>
            <div className={styles.menuItem} onClick={() => this.goToPage(menuItem.url)}>
                {menuItem.title}
            </div>
        </React.Fragment>

        return <React.Fragment key={id()}>
            <div className={styles.extendedMenuItem}>
                {menuItem.title}
                <div className={styles.secondMenu}>
                    {
                        menuItem.items.map(i => this.renderMenuItem(i))
                    }
                </div>
            </div>
        </React.Fragment>
    }

    renderOnlyMenuItem = () => {
        const items: MenuItem[] = [];
        menu.forEach(m => {
            if (m instanceof MenuItem) items.push(m);
            else m.items.map(em => items.push(em));
        });

        return <>
            {
                items.map(i =>
                    <li key={id()} onClick={() => this.goToPage(i.url)}>
                        <div>{i.title}</div>
                    </li>
                )}
        </>
    }

    goToPage = (url: string) => {
        this.setState({ showMenu: false });
        history.push(url)
    }

    render() {
        return <>
            <div className={`${styles.overlay} ${this.state.showMenu ? styles.open : ''}`} onClick={() => this.setState({ showMenu: false })}></div>
            <div className={`${styles.box} ${this.state.showMenu ? styles.full_menu : ''}`}>
                <div className={styles.hamburger_keeper} onClick={(event) => this.setState(prevState => ({ showMenu: !prevState.showMenu }))}>
                    <div className={`${styles.hamburger} ${this.state.showMenu ? styles.animate : ''}`}></div>
                </div>

                <div className={`${styles.wrapper} ${this.state.showMenu ? styles.open : ''} `}>
                    <nav>
                        <ul>
                            {this.renderOnlyMenuItem()}
                        </ul>
                    </nav>
                </div>

            </div>
        </>
    }
}