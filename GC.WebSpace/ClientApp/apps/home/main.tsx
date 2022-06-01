import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Home } from './components/home'
import { Root } from "../root/root";

ReactDOM.render(
    <Root withSideBar>
        <Home/>
    </Root>
    , document.getElementById('app'))
