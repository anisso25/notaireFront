import { combineReducers } from 'redux';
import commonReducers from '~/containers/Common/reducers';
import mainAppReducers from '~/containers/MainApp/reducers';
import backofficeReducers from '~/containers/Backoffice/reducers';

export default combineReducers({
  ...commonReducers,
  ...mainAppReducers,
  ...backofficeReducers,
});
