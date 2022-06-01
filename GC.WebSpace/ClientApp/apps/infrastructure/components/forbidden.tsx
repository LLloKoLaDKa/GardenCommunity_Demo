import React from "react";
import { Component } from "react";
import { UsersProvider } from "../../../domain/users/usersProvider";
import { ErrorBlock, ErrorSolution } from "./error/ErrorBlock";
import { AuthLinks } from "../../../tools/links";
import { addErrorNotification } from "../../../tools/notifications";

export class Forbidden extends Component {
    changePermission = async () => {
        var result = await UsersProvider.changeTokenPermission();
        if(!result.isSuccess){
            addErrorNotification(result.errors[0].message);
            return;
        }

        window.location.href = AuthLinks.changePermission;
    }

    render() {
        return (
            <>
                <ErrorBlock
                    statusCode={403}
                    message={"У вас нет доступа к функционалу"}
                    errorSolution={new ErrorSolution("Поменять роль", this.changePermission)}
                />
            </>
        );

    }
}