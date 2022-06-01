import React, { Component } from "react";
import { MyMainButton } from "../../shared/myButton/myMainButton";
import styles from "./header.module.scss";

interface IProps {
    headerTitle: string,
    buttonContent: string,
    buttonIcon?: React.ReactNode,
    buttonOnClick: () => void
}

export class Header extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { headerTitle, buttonContent, buttonIcon, buttonOnClick } = this.props;
        return (
            <div className={styles.header}>
                <h2>{headerTitle}</h2>

                <MyMainButton icon={buttonIcon} text={buttonContent} onClick={buttonOnClick} />
            </div>
        );
    }
}