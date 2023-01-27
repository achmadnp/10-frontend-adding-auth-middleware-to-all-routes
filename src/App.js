import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import "./App.css";
import Dialysis from "./pages/Dialysis/Dialysis";
import DialyseDaten from "./components/Dialysedaten/DialyseDaten";
import Medikationsplan from "./components/Medikationsplan/Medikationsplan";
import Beratung from "./components/Beratung/Beratung";
import Patienten from "./components/Patienten/Patienten";
import BeratungArzt from "./components/BeratungArzt/BeratungArzt";
import ArztDialyseDaten from "./components/ArztDialyseDaten/ArztDialyseDaten";

class App extends Component {
  state = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, role: role, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  mobileNavHandler = (isOpen) => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("fehlerhafte Validierung");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Fehler bei Authentifizierung");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          role: resData.role,
          authLoading: false,
          userId: resData.userId,
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("role", resData.role);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Überprüfung fehlgeschlagen. Stellen Sie sicher, dass die E-Mail-Adresse noch nicht verwendet wird!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Benutzer konnte nicht erstellt werden.");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <LoginPage
              {...props}
              onLogin={this.loginHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={(props) => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
      </Switch>
    );
    if (this.state.isAuth && this.state.role === "patient") {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <DialyseDaten
                userId={this.state.userId}
                token={this.state.token}
                role={this.state.role}
              />
            )}
          />

          <Route
            path="/medikationsplan"
            exact
            render={(props) => (
              <Medikationsplan
                userId={this.state.userId}
                token={this.state.token}
                role={this.state.role}
              />
            )}
          />
          <Route
            path="/beratung"
            exact
            render={(props) => (
              <Beratung
                userId={this.state.userId}
                token={this.state.token}
                role={this.state.role}
              />
            )}
          />
          <Route
            path="/medikationsplan"
            exact
            render={(props) => (
              <Dialysis
                userId={this.state.userId}
                token={this.state.token}
                role={this.state.role}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      );
    }
    if (this.state.isAuth && this.state.role === "arzt") {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Patienten
                userId={this.state.userId}
                token={this.state.token}
                role={this.state.role}
              />
            )}
          />
          <Route
            path="/patient/:id/detail"
            exact
            render={(props) => (
              <ArztDialyseDaten
                token={this.state.token}
                role={this.state.role}
              />
            )}
          />
          <Route
            path="/beratungstermine"
            exact
            render={(props) => (
              <BeratungArzt
                {...props}
                userId={this.state.userId}
                token={this.state.token}
              />
            )}
          />
        </Switch>
      );
    }
    return (
      <Fragment>
        <Layout
          header={
            <Toolbar>
              <MainNavigation
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
                role={this.state.role}
              />
            </Toolbar>
          }
        />
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
