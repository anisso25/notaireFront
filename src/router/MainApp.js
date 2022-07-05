import RoutesRenderer from './RoutesRenderer';
import { EmployeesListPage } from '~/containers/MainApp/Employee';
import { DocumentPage, DocumentsList, NewDocument } from '~/containers/MainApp/Document';
import { InstancesListPage } from '~/containers/MainApp/Instance';
import OfficeInfo from '~/containers/MainApp/OfficeInfo';

export const MainAppRoutes = [
  // Office Management
  {
    component: EmployeesListPage,
    layout: 'DashboardLayout',
    allowedUsers: ['ADMIN'],
    to: '/management/employee',
    id: 'employee-list',
  },
  {
    title: 'OfficeInfo',
    component: OfficeInfo,
    layout: 'DashboardLayout',
    allowedUsers: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE'],
    to: '/management/office-infos',
    id: 'office-infos',
  },

  // Instance Management
  {
    title: 'Instances List',
    component: InstancesListPage,
    layout: 'DashboardLayout',
    allowedUsers: ['ADMIN', 'EMPLOYEE'],
    to: '/management/instance/:entityId/:entityName',
    id: 'instances-list',
  },

  // Documents
  {
    title: 'Documents categories',
    component: NewDocument,
    layout: 'DashboardLayout',
    allowedUsers: ['ADMIN', 'EMPLOYEE'],
    to: '/document',
    id: 'documents-categories',
  },

  {
    title: 'Document page',
    component: DocumentPage,
    layout: 'DashboardLayout',
    allowedUsers: ['ADMIN', 'EMPLOYEE'],
    to: '/document/edit/:docId',
    id: 'edit-document',
  },
  {
    title: 'Documents List',
    component: DocumentsList,
    layout: 'DashboardLayout',
    allowedUsers: ['ADMIN', 'EMPLOYEE'],
    to: '/document/:catId',
    id: 'document-list',
  },

];

export function MainApp() {
  return RoutesRenderer(MainAppRoutes);
}
