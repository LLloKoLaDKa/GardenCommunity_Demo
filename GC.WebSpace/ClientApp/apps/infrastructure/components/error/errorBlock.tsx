import React, { Component } from "react";
import { UsersProvider } from "../../../../domain/users/usersProvider";
import { MyMainButton } from "../../../../shared/myButton/myMainButton";
import { AuthLinks, InfrastructureLinks, SiteLinks } from "../../../../tools/links";
import './errorBlock.scss';

interface IProps {
    message: string,
    statusCode: string | number,
    errorSolution?: ErrorSolution

}

export class ErrorSolution {
    constructor(
        public name: string,
        public action: () => void
    ) { }
}

export class ErrorBlock extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    logOut = async () => {
        await UsersProvider.logOut();
        window.location.href = AuthLinks.autentication;
    }

    back = () => {
        if (document.referrer.includes("IS")) window.location.href = InfrastructureLinks.adminHome;
        else window.location.href = SiteLinks.homePage;
    }

    render() {
        return (
            <div className="error-block">
                <i className="fas frown fa-frown main-text-color" aria-hidden="true"></i>
                <h3 className="status-code">{`Ошибка ${this.props.statusCode}`}</h3>
                <h5 className="error-message">{this.props.message}</h5>

                <div className="error-solutions">
                    <MyMainButton text="На главную" onClick={this.back} />

                    <MyMainButton text="Выйти" onClick={this.logOut} />

                    {
                        this.props.errorSolution != null &&
                        <MyMainButton text={this.props.errorSolution.name} onClick={this.props.errorSolution.action} />
                    }
                </div>
            </div>
        )
    }
}
