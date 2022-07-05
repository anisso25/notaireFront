import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  allowedUsers,
  ...rest
}) => {
  const { auth, userInfo } = useSelector(state => state.user);
  if (!allowedUsers.includes(userInfo?.data?.type)) {
    return <Redirect to="/signin" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        auth?.isLogged
          ? <Component {...props} />
          : <Redirect to="/signin" />
      )}
    />
  );
};

export default PrivateRoute;
