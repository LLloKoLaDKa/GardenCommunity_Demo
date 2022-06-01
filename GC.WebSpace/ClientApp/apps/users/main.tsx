import React from 'react';
import * as ReactDOM from 'react-dom';
import { Users } from './components/users';
import { Root } from '../root/root'
import './content/users.scss'


ReactDOM.render(
    <Root withSideBar>
        <Users/>
    </Root>,
    document.getElementById('app'));
