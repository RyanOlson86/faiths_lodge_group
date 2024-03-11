import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ListView from "../ListView/ListView";
import MapView from "../MapView/MapView";
import OptionsPage from "../OptionsPage/OptionsPage";
import OrgInfo from "../OrgInfo/OrgInfo";
import AddOrgPage from "../AddOrgPage/AddOrgPage";

import "./App.css";
import TestPage from "../TestPage/TestPage";

// Test comment

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    dispatch({type:'FETCH_ORGANIZATIONS'});
    dispatch({ type: "FETCH_LOSSES" });
    dispatch({ type: "FETCH_SERVICES" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />
          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>
          // ! Need to delete test page before release
          <Route
            // page for testing components
            exact
            path="/test"
          >
            <TestPage />
          </Route>
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>
          {/* Route for MapView */}
          <ProtectedRoute exact path="/map">
            <MapView />
          </ProtectedRoute>
          {/* Route for ListView */}
          <ProtectedRoute exact path="/list">
            <ListView />
          </ProtectedRoute>
          {/* Route for AddOrg */}
          <ProtectedRoute exact path="/addorg">
            <AddOrgPage />
          </ProtectedRoute>
          {/* Route for OptionsPage */}
          <ProtectedRoute exact path="/options">
            <OptionsPage />
          </ProtectedRoute>
          {/* Route for OrgInfo */}
          <ProtectedRoute exact path="/org/:id">
            <OrgInfo />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>
          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>
          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
