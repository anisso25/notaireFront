import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DashboardLayout from './DashboardLayout';
import MainLayout from './MainLayout';

const Layout = ({
  children,
  PageHeader,
  name,
  loading,
  hideSidebar,
}) => {
  const content = useMemo(() => {
    switch (name) {
      case 'DashboardLayout':
        return (
          <DashboardLayout
            PageHeader={PageHeader}
            loading={loading}
            hideSidebar={hideSidebar}
          >{children}
          </DashboardLayout>
        );
      case 'MainLayout':
        return <MainLayout loading={loading}>{children}</MainLayout>;
      default:
        return <MainLayout loading={loading}>{children}</MainLayout>;
    }
  }, [name, children]);

  return content;
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  PageHeader: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  name: PropTypes.string,
  loading: PropTypes.bool,
  hideSidebar: PropTypes.bool,
};

Layout.defaultProps = {
  name: 'MainLayout',
  loading: false,
  hideSidebar: false,
  PageHeader: undefined,
};

export default Layout;
