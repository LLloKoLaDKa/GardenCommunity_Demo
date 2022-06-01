import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { AdsList } from "./components/adsList";

ReactDOM.render(
    <Root withSideBar>
        <AdsList />
    </Root>
    , document.getElementById('app')
);