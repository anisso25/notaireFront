import RoutesRenderer from './RoutesRenderer';
import { TemplatesListPage, BuildTemplatePage } from '~/containers/Backoffice/Template';
import { CategoriesListPage } from '~/containers/Backoffice/Category';

export const BackofficeRoutes = [
  // Templates
  {
    title: 'Templates list',
    component: TemplatesListPage,
    layout: 'DashboardLayout',
    allowedUsers: ['SUPER_ADMIN'],
    to: '/management/template',
    id: 'templates-list',
  },
  {
    title: 'New template',
    component: BuildTemplatePage,
    layout: 'DashboardLayout',
    allowedUsers: ['SUPER_ADMIN'],
    to: '/management/template/new',
    id: 'new-template',
  },
  {
    title: 'Edit template',
    component: BuildTemplatePage,
    layout: 'DashboardLayout',
    allowedUsers: ['SUPER_ADMIN'],
    to: '/management/template/edit/:templateId',
    id: 'edit-template',
  },

  // Categories
  {
    title: 'Categories management',
    component: CategoriesListPage,
    layout: 'DashboardLayout',
    allowedUsers: ['SUPER_ADMIN'],
    to: '/management/category',
    id: 'categories-list',
  },
];

export function Backoffice() {
  return RoutesRenderer(BackofficeRoutes);
}
