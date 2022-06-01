import React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router';
import browserHistory from '../../tools/history';
import { AuthLinks } from '../../tools/links';
import { Root } from '../root/root';
import { Authentication } from './components/authentication';
import { Authorization } from './components/authorization';

ReactDOM.render(
    <Root withoutPadding >
        <Router history={browserHistory}>
            <Switch>
                <Route exact path={AuthLinks.autentication} component={Authentication} />
                <Route exact path={AuthLinks.changePermission} component={Authorization} />
            </Switch>
        </Router>
    </Root>
    , document.getElementById('app'));
