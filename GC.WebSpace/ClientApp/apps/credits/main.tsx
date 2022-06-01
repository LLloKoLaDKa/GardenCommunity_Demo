import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { Credits } from "./components/credits";

ReactDOM.render(
    <Root withSideBar >
        <Credits />
    </Root>,
    document.getElementById('app')
);