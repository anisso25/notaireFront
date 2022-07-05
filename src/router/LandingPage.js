import RoutesRenderer from './RoutesRenderer';
import { Homepage } from '~/containers/LandingPage';

export const LandingPageRoutes = [
  {
    title: 'Landing page home',
    component: Homepage,
    layout: 'MainLayout',
    isRestricted: false,
    to: '/',
    id: 'landingpage-home',
  },
];

export function LandingPage() {
  return RoutesRenderer(LandingPageRoutes);
}
