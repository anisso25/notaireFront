import { all } from 'redux-saga/effects';
import commonSagas from '~/containers/Common/sagas';
import mainAppSagas from '~/containers/MainApp/sagas';
import backofficeSagas from '~/containers/Backoffice/sagas';

function* rootSaga() {
  yield all([
    ...commonSagas,
    ...mainAppSagas,
    ...backofficeSagas,
  ]);
}

export default rootSaga;
