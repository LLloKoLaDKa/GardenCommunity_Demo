import { createTheme, ThemeProvider } from "@mui/material";
import React, { Component } from "react";
import ReactNotification from 'react-notifications-component';
import '../../content';
import { BlockUi } from "../../shared/blockUi/blockUi";
import { SideBar } from "../../shared/sidebar/sidebar";

interface IProps {
    withSideBar?: boolean,
    disabledOverflow?: boolean,
    withoutPadding?: boolean
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#295a2b',
        },
        secondary: {
            main: '#214f23'
        },
    },
    typography: {
        fontFamily: 'Gotham Pro, sans-serif'
    }
});

export class Root extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    render() {
        const { disabledOverflow, withoutPadding } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <ReactNotification />
                <BlockUi />

                <div className={`main-container`}>
                    {this.props.withSideBar && <SideBar />}

                    <div className={`content ${disabledOverflow ? '' : 'overflow'} ${withoutPadding ? '' : 'main_padding'}`}>
                        {this.props.children}
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}