import React from "react";
import styles from '../../content/footer.module.scss';

export class Footer extends React.Component {
    render() {
        return <>
            <div className={styles.footer}>
                {`${new Date(Date.now()).getFullYear()} © СНТ «Полесье».`}
                <span className={styles.link} onClick={() => window.location.href = "/IS/"}>Панель администратора</span>
            </div>
        </>
    }
}