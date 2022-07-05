import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, isRestricted, ...rest }) => {
  const { isLogged } = useSelector(state => state.user.auth);
  return (
    <Route
      {...rest}
      render={(props) => (
        isLogged && isRestricted
          ? <Redirect to="/dashboard" />
          : <Component {...props} />
      )}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  isRestricted: PropTypes.bool,
};

PublicRoute.defaultProps = {
  isRestricted: false,
};

export default PublicRoute;
