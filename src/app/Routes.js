import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import {AuthorizedRoute} from "asseco-commons";
import { LoginPage } from "asseco-commons";
import { PublicRoute } from "asseco-commons";
import { CallbackPage } from "asseco-commons";
import { LogoutPage } from "asseco-commons";
import { ProfilePage } from "asseco-commons";
import { InactivityPage } from "asseco-commons";
import { UnauthorizedPage } from "asseco-commons";
import { SilentRenew } from "asseco-commons";
import Layout from "./mainLayout";
import { Error404Page, ErrorPage } from "asseco-commons";
import Home from "./HomeComponent";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import DashboardContainer from "./domain/dashboard/DashboardContainer";
// import { SUPERADMIN, OPERATORI, KORISNICI } from "./util/userRoleConstants";

export default function Routes(props) {
  const { history } = props;
  return (
    <Router
      history={history}
      basename={process.env.REACT_APP_ROUTER_BASE || ""}
    >
      <RouterRoutes>
        <Route
          exact
          path="/callback"
          element={<PublicRoute component={CallbackPage} />}
        />
        <Route
          exact
          path="/silent_renew"
          element={<PublicRoute component={SilentRenew} />}
        />
        <Route
          exact
          path="/err"
          element={<PublicRoute component={ErrorPage} />}
        />
        <Route
          exact
          path="/err404"
          element={<PublicRoute component={Error404Page} />}
        />
        <Route
          exact
          path="/logout"
          element={<PublicRoute component={LogoutPage} />}
        />
        <Route
          exact
          path="/profile"
          element={<PublicRoute component={ProfilePage} />}
        />
        <Route
          exact
          path="/inactivity"
          element={<PublicRoute component={InactivityPage} />}
        />
        <Route
          exact
          path="/Unauthorized"
          element={<PublicRoute component={UnauthorizedPage} />}
        />
        <Route
          exact
          path="/login"
          element={<PublicRoute component={LoginPage} />}
        />
        <Route
          exact
          path="/"
          element={
            <PublicRoute
              component={DashboardContainer}
              layout={Layout}
            />
          }
        />
        <Route
          exact
          path="/outer/outerSingle"
          element={<AuthorizedRoute component={Home} layout={Layout} />}
        />
        <Route
          exact
          path="/outer/inner/edit"
          element={<AuthorizedRoute component={Home} layout={Layout} />}
        />
        <Route
          exact
          path="/outer/inner/view"
          element={<AuthorizedRoute component={Home} layout={Layout} />}
        />
        <Route element={<Error404Page />} />
      </RouterRoutes>
    </Router>
  );
}
