import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ViewAdapter from "./ViewAdapter";

function App(routes) {
  const e = React.createElement;
  routes = routes.map(route => {
    let props = {
      path: route.path
    }
    if (route.exact) {
      props.exact = true;
    }
    return e(Route, props, e(route.component));
  });
  return e(Router, e(Switch, routes));
}

class ReactAdapter extends ViewAdapter {
  constructor() {
    super();
    this._routes = [];
    this._rendered = false;
  }
  addRoutes(_routes) {
    this._routes = this._routes.concat(_routes);
  }
  render(el) {
    if (this._rendered) return;
    ReactDOM.render(App(this._routes), document.querySelector(el));
    this._rendered = true;
  }
}

export default ReactAdapter;
