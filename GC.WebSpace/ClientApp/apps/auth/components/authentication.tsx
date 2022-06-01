import LoginIcon from '@mui/icons-material/Login';
import React, { Component } from "react";
import { UsersProvider } from "../../../domain/users/usersProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyMainButton } from "../../../shared/myButton/myMainButton";
import PasswordBox from "../../../shared/myinputs/passwordBox/passwordBox";
import { TextBox } from "../../../shared/myinputs/textBox/textBox";
import styles from '../content/authentication.module.scss';

interface IState {
    login: string,
    password: string,
    error: string
}

interface IProps { }

export class Authentication extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            login: '',
            password: '',
            error: ''
        }
    }

    componentDidMount = () => document.addEventListener("keydown", this.handleKeyDown)
    componentWillUnMount = () => document.removeEventListener("keydown", this.handleKeyDown);

    handleKeyDown = (event: { keyCode: any }) => {
        var enterKey = 13;
        switch (event.keyCode) {
            case enterKey:
                this.logIn();
                break;
        }
    }

    changeLogin = (login: string) => this.setState({ login });
    changePassword = (password: string) => this.setState({ password });

    logIn = () => {
        BlockUi.blockAsync(async () => {
            const { login, password } = this.state;

            return new Promise(async (resolve) => {
                const result = await UsersProvider.logIn(login, password);

                if (!result.isSuccess) {
                    this.setState({ error: result.errors[0].message });
                    resolve();
                }
            })
        })
    }

    render() {
        const { login, password, error } = this.state;

        return <>
            <div className={styles.container}>
                <div className={styles.block}>
                    <h1 className="title">POLESYE</h1>

                    <TextBox
                        label="Логин"
                        value={login}
                        onChange={this.changeLogin}
                    />

                    <PasswordBox
                        label="Пароль"
                        value={password}
                        onChange={this.changePassword}
                    />

                    {
                        this.state.error != '' &&
                        <div className={styles.error}>
                            {error}
                        </div>
                    }

                    <MyMainButton text='Войти' fullWidth icon={<LoginIcon />} onClick={this.logIn} />
                    <div className={styles.version}>
                        {(window as any).payload ?? ''}
                    </div>
                </div>
            </div>

        </>
    }
}
