import RoutesRenderer from './RoutesRenderer';
import { Error404 } from '~/containers/Common/Errors';

export const ErrorsRoutes = [
  // Must be the last route
  {
    title: 'Page Not found',
    component: Error404,
    layout: 'MainLayout',
    id: 'page-not-found',
  },
];

export function Errors() {
  return RoutesRenderer(ErrorsRoutes);
}
