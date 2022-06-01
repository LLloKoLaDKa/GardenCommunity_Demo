import React from "react";
import ReactDOM from "react-dom";
import { Root } from "../root/root";
import { ContactsList } from "./components/contactsList";

ReactDOM.render(
    <Root withSideBar>
        <ContactsList />
    </Root>,
    document.getElementById('app')
);