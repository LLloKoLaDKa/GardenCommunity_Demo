import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { AccessPolicies } from "./components/accessPolicies";

ReactDOM.render (
    <Root withSideBar>
        <AccessPolicies/>
    </Root>,
    document.getElementById("app")
)