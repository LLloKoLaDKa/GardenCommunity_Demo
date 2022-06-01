import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { AppealsList } from "./components/appealsList";

ReactDOM.render(
    <Root withSideBar>
        <AppealsList />
    </Root>,
    document.getElementById('app')
);