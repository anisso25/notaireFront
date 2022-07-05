import React from 'react';
import PrivateRoute from './Auth/PrivateRoute';
import PublicRoute from './Auth/PublicRoute';

function RouteRenderer(route) {
  let routes = [];
  if (route.component !== undefined) {
    routes.push(
      route.allowedUsers
        ? (
          <PrivateRoute
            exact
            key={route.title}
            allowedUsers={route.allowedUsers}
            path={route.to}
            component={props => <route.component name={route.layout} {...props} />}
            id={route.id}
          />
        )
        : (
          <PublicRoute
            exact
            key={route.title}
            path={route.to}
            component={props => <route.component name={route.layout} {...props} />}
            id={route.id}
            isRestricted={route.isRestricted}
          />
        ),
    );
  }
  if (Array.isArray(route.children)) {
    route?.children.forEach(r => {
      routes = routes.concat(RouteRenderer(r));
    });
  }
  return routes;
}

export default function RoutesRenderer(routes) {
  return routes?.map(route => RouteRenderer(route));
}
