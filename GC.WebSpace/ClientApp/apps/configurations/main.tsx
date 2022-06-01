import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { Configurations } from "./components/configurations";

ReactDOM.render(
    <Root withSideBar>
        <Configurations/>
    </Root>
    , document.getElementById('app'))
