import UserSaga from './User/sagas';
import GeneralSaga from './HomePage/sagas';

export default [
  UserSaga(),
  GeneralSaga(),
];
