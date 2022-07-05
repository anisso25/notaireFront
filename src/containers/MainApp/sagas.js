import InstanceSaga from './Instance/sagas';
import DocumentSaga from './Document/sagas';
import EmployeeSaga from './Employee/sagas';

export default [
  InstanceSaga(),
  DocumentSaga(),
  EmployeeSaga(),
];
