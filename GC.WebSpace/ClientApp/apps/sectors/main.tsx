import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { Sectors } from "./components/sectors";

ReactDOM.render(
    <Root withSideBar>
        <Sectors/>
    </Root>
    , document.getElementById('app')
)