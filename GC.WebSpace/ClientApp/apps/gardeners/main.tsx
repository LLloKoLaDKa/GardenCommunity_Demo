import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { Gardeners } from "./components/gardeners";

ReactDOM.render(
    <Root withSideBar>
        <Gardeners/>
    </Root>
    , document.getElementById('app')
)