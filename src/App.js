import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { store, persistor } from '~/redux/redux';

import {
  UserRouter,
  MainAppRouter,
  BackofficeRouter,
  LandingPageRouter,
  ErrorsRouter,
} from '~/router';

import { fetchGeneralData, fetchEntitiesList } from '~/containers/Common/HomePage/actions';
import GlobalFonts from '~/containers/Common/Fonts/Fonts';

import theme from './theme/antd.lessvars';

function App() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector(state => state.user.auth);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchGeneralData());
      dispatch(fetchEntitiesList());
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalFonts />
      <Router>
        <Switch>
          { UserRouter() }
          { MainAppRouter() }
          { BackofficeRouter() }
          { LandingPageRouter() }
          { ErrorsRouter() }
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default AppWrapper;
