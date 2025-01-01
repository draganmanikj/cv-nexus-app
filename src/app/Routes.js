import React from "react";
import { useSelector } from "react-redux";
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
import DosieContainer from "./domain/dosie/DosieContainer"
import WorkingPositionsContainer from "./domain/workingPositionType/WorkingPositionTypesContainer"
import RolesPositionsComponent from "./domain/rolesPositionType/RolesPositionTypesComponent"
import DocumentTypesContainer from "./domain/documentType/DocumentTypesContainer"
import Countries from "./domain/countries/CountriesComponent"
import Faculties from "./domain/faculties/FacultyComponent"
import Universities from "./domain/universities/UniversityComponent"
import DegreeEducation from "./domain/degreeEducation/DegreeEducationComponent"
import TypeAreaComponent from "./domain/typeArea/TypeAreaComponent"
import LanguagesComponent from "./domain/languages/LanguagesTypeComponent"
import OutputDocument from "./domain/output_documents_printing/OutputDocumentsPrintingContainer"

export default function Routes(props) {
  const { history } = props;
  const userGroups = useSelector((state) => state.oidc.user?.profile.groups);
  const adminGroup = "admins";
  const isAdmin = userGroups?.includes(adminGroup);

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
          path="/moedosie"
          element={
            <AuthorizedRoute
              component={DosieContainer}
              layout={Layout}
            />
          }
        />
        {isAdmin &&
        <Route
          exact
          path="/korisnici"
          element={
            <AuthorizedRoute
              component={DosieContainer}
              layout={Layout}
            />
          }
        />
        }
        {isAdmin && 
        <>
        <Route
          exact
          path="/workingPositionTypes"
          element={
            <AuthorizedRoute
              component={WorkingPositionsContainer}
              layout={Layout}
            />
          }
        />
        
        <Route
          exact
          path="/rolesPositionTypes"
          element={
            <AuthorizedRoute
              component={RolesPositionsComponent}
              layout={Layout}
            />
          }
        />
        
        <Route
          exact
          path="/documentTypes"
          element={
            <AuthorizedRoute
              component={DocumentTypesContainer}
              layout={Layout}
            />
          }
        />
        
        <Route
          exact
          path="/countries"
          element={
            <AuthorizedRoute
              component={Countries}
              layout={Layout}
            />
          }
        />
        <Route
          exact
          path="/faculties"
          element={
            <AuthorizedRoute
              component={Faculties}
              layout={Layout}
            />
          }
        />
        
        <Route
          exact
          path="/universities"
          element={
            <AuthorizedRoute
              component={Universities}
              layout={Layout}
            />
          }
        />
        <Route
          exact
          path="/degree"
          element={
            <AuthorizedRoute
              component={DegreeEducation}
              layout={Layout}
            />
          }
        />
        <Route
          exact
          path="/areatype"
          element={
            <AuthorizedRoute
              component={TypeAreaComponent}
              layout={Layout}
            />
          }
        />
        <Route
          exact
          path="/languages"
          element={
            <AuthorizedRoute
              component={LanguagesComponent}
              layout={Layout}
            />
          }
        />
         <Route
          exact
          path="/output_documents"
          element={
            <AuthorizedRoute
              component={OutputDocument}
              layout={Layout}
            />
          }
        />
        </>
        }
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
