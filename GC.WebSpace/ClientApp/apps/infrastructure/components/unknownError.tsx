import React from "react";
import { Component } from "react";
import { UsersProvider } from "../../../domain/users/usersProvider";
import { ErrorBlock } from "./error/ErrorBlock";
import { AuthLinks } from "../../../tools/links";
import { addErrorNotification } from "../../../tools/notifications";

interface IProps {
    statusCode: string
}

export class UnknownError extends React.Component<IProps> {
    changePermission = async () => {
        var result = await UsersProvider.changeTokenPermission();

        if(!result.isSuccess){
            addErrorNotification(result.errors[0].message);
            return;
        }

        window.location.href = AuthLinks.changePermission;
    }

    render() {
        const url = document.location.href;

        return (
            <>
                <ErrorBlock
                    statusCode={this.props.statusCode}
                    message={"Неизвестная ошибка"}
                />
            </>
        );

    }
}