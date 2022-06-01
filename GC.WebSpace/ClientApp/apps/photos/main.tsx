import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { Photos } from "./components/photos";

ReactDOM.render(
    <Root withSideBar>
        <Photos />
    </Root>,
    document.getElementById("app")
);