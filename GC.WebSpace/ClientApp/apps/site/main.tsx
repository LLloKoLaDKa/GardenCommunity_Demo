import React from "react";
import ReactDOM from "react-dom";
import ReactNotification from 'react-notifications-component';
import { YMaps } from "react-yandex-maps";
import { SiteRouter } from "./components/router";

ReactDOM.render(
    <YMaps>
        <ReactNotification />
        <SiteRouter />
    </YMaps>,
    document.getElementById('app')
);