import React from "react";
import { TabPane } from "./tabPane";
import styles from './tabs.module.scss';

interface IProps {
    onChangeTab?: (selectedTab: number) => Promise<void>;
}

interface IState {
    selectedTab: number
}

export class Tabs extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            selectedTab: 0
        }
    }

    setTab = async (selectedTab: number) => {
        if (this.props.onChangeTab != undefined) await this.props.onChangeTab(selectedTab);
        this.setState({ selectedTab });
    }

    render() {
        const { selectedTab } = this.state;
        const { children } = this.props;

        return (
            <>
                <div className={styles.tab_nav}>
                    {
                        (children as TabPane[]).map((child, index) =>
                            <div
                                key={index}
                                onClick={child.props.disabled == true ? () => { } : () => this.setTab(index)}
                                className={`${selectedTab == index ? styles.tab_nav_item_active : styles.tab_nav_item}
                                    ${child.props.disabled == true ? styles.disabled_tab : ''}`}>
                                {child.props.label}
                            </div>
                        )
                    }
                </div>

                {
                    <div>
                        {(children as TabPane[])[selectedTab].props.children}
                    </div>
                }
            </>
        )
    }
}
