import React, { useEffect, useReducer } from "react";
import { Header } from "./components/Header/Header";
import Auth from "./pages/Authentication/Auth";
import { reducer, initialState, Context } from "./store/Store";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/Firebase/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthController from "./controllers/Authentication/AuthController";
import Dashboard from "./pages/Dashboard/Dashboard";
import TenantProfile from "./pages/TenantProfile/TenantProfile";
import { AuthUserInfoProps } from "./interfaces/AuthUserInfoProps";
firebase?.initializeApp(firebaseConfig);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (authUser) => {
        if (authUser) {
          const userInfo : AuthUserInfoProps = await AuthController.getUserInfo(authUser.uid);
          dispatch({ type: "userInfo", userInfo: userInfo.user });
          dispatch({ type: "isLoggedIn", isLoggedIn: true });
        } else {
          dispatch({ type: "userInfo", userInfo: null });
          dispatch({ type: "isLoggedIn", isLoggedIn: false });
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
    return () => unsubscribe();
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Route
          path="/"
          render={() => (
            <Redirect
              to={{
                pathname: state.isLoggedIn ? "/dashboard" : "/login",
              }}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <Redirect
              to={{
                pathname: state.isLoggedIn ? "/dashboard" : "/login",
              }}
            />
          )}
        />
        <Route exact path="/login" component={Auth} />
        {state.isLoggedIn && (
          <>
            <Header userInfo={state.userInfo} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={TenantProfile} />
          </>
        )}
      </Router>
    </Context.Provider>
  );
}

export default App;
