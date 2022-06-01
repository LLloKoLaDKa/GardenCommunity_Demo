import React from "react";
import { Component } from "react";
import { UsersProvider } from "../../../domain/users/usersProvider";
import { ErrorBlock} from "./error/ErrorBlock";
import { AuthLinks } from "../../../tools/links";
import { addErrorNotification } from "../../../tools/notifications";

export class NotFound extends Component {
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
                    statusCode={404}
                    message={"Страница не найдена"}
                />
            </>
        );

    }
}