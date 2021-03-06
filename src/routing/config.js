import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import NotFoundPage from "pages/404";
import authService from "services/auth.service";

const PublicRouter = (
  { component: Component, ...rest } // eslint-disable-line
) => <Route {...rest} render={(props) => <Component {...props} />} />;

const PrivateRouter = (
  { component: Component, ...rest } // eslint-disable-line
) => (
  <Route
    {...rest}
    render={(props) =>
      authService.isLoggedIn() && localStorage.getItem("perfil") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }} // eslint-disable-line
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter basename={`/`}>
    <Switch>
      {publicRoutes.map((value, key) => {
        return (
          <PublicRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
          />
        );
      })}
      {privateRoutes.map((value, key) => {
        return (
          <PrivateRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
          />
        );
      })}
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
