import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Router, Switch } from "react-router";
import '../../../content';
import browserHistory from '../../../tools/history';
import { SiteLinks } from "../../../tools/links";
import { Site, SitePage } from "./site";

const theme = createTheme({
    palette: {
        primary: {
            main: '#295a2b',
        },
        secondary: {
            main: '#214f23'
        },
    },
    typography: {
        fontFamily: 'Gotham Pro, sans-serif'
    }
});


export class SiteRouter extends React.Component {
    render() {
        return <>
            <ThemeProvider theme={theme}>
                <Router history={browserHistory}>
                    <Switch>
                        <Route exact path={SiteLinks.homePage} render={() => <Site page={SitePage.Home} />} />
                        <Route exact path={SiteLinks.newsPage} render={() => <Site page={SitePage.News} />} />
                        <Route exact path={SiteLinks.newsByIdPage} render={(props) => <Site page={SitePage.NoveltyPage} windowProps={props} />} />
                        <Route exact path={SiteLinks.adsPage} render={() => <Site page={SitePage.Ads} />} />
                        <Route exact path={SiteLinks.adByIdPage} render={(props) => <Site page={SitePage.AdPage} windowProps={props} />} />
                        <Route exact path={SiteLinks.contactsPage} render={() => <Site page={SitePage.Contacts} />} />
                        <Route exact path={SiteLinks.sectorSales} render={() => <Site page={SitePage.SectorSales} />} />
                        <Route exact path={SiteLinks.information} render={() => <Site page={SitePage.Information} />} />
                        <Route exact path={SiteLinks.gallery} render={() => <Site page={SitePage.Gallery} />} />
                        <Route exact path={SiteLinks.credits} render={() => <Site page={SitePage.Credits} />} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    }
}
