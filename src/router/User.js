import RoutesRenderer from './RoutesRenderer';
import { WelcomePage } from '~/containers/Common/HomePage';
import Signin from '~/containers/Common/User/Signin';
import ForgottenPassword from '~/containers/Common/User/ForgottenPassword';
import ResetPassword from '~/containers/Common/User/ResetPassword';
import Profile from '~/containers/Common/User/Profile';

export const UserRoutes = [
  {
    title: 'Home Page',
    component: WelcomePage,
    layout: 'DashboardLayout',
    allowedUsers: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE'],
    to: '/dashboard',
    id: 'dashboard-page',
  },
  {
    title: 'Signin',
    component: Signin,
    layout: 'MainLayout',
    isRestricted: true,
    to: '/signin',
    id: 'signin',
  },
  {
    title: 'Forgotten Password',
    component: ForgottenPassword,
    layout: 'MainLayout',
    isRestricted: true,
    to: '/forgotten-password',
    id: 'forgotten-password',
  },
  {
    title: 'Reset Password',
    component: ResetPassword,
    layout: 'MainLayout',
    isRestricted: true,
    to: '/reset-password',
    id: 'reset-password',
  },
  {
    title: 'Profile',
    component: Profile,
    layout: 'DashboardLayout',
    allowedUsers: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE'],
    to: '/profile',
    id: 'profile',
  },
];

export function User() {
  return RoutesRenderer(UserRoutes);
}
