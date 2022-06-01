import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { PageEntries } from "./components/pageEntries";

ReactDOM.render(
    <Root withSideBar>
        <PageEntries />
    </Root>,
    document.getElementById("app")
);