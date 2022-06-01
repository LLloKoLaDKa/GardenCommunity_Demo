import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import ReactDOM from "react-dom";
import { Route, Router } from "react-router";
import { Root } from "../root/root";
import browserHistory from '../../tools/history';
import { InfrastructureLinks } from "../../tools/links";
import { Forbidden } from "./components/forbidden";
import { NotFound } from "./components/notFound";
import { UnknownError } from "./components/unknownError";

ReactDOM.render(
    <Root disabledOverflow>
        <Router history={browserHistory}>
            <Switch>
                <Route exact path={InfrastructureLinks.forbidden} component={Forbidden} />
                <Route exact path={InfrastructureLinks.notFound} component={NotFound} />
                <Route path={InfrastructureLinks.UnknownError} render={(props) => <UnknownError statusCode={props.match.params.statusCode!} />} />
            </Switch>
        </Router>
    </Root>,
    document.getElementById("app")
)