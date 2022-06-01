import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { NoveltiesList } from "./components/noveltiesList";

ReactDOM.render(
    <Root withSideBar>
        <NoveltiesList />
    </Root>,
    document.getElementById('app')
);