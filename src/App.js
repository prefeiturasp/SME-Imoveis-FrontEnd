import React from "react";
import Routes from "routing/config";
import ReactGA from "react-ga";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/styles.scss";
import "./App.scss";

ReactGA.initialize("UA-153279384-1");
ReactGA.pageview(window.location.pathname + window.location.search);


export const App = () => {
  return <Routes />;
};

export default App;
