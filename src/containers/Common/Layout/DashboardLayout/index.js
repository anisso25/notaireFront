import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd';
import {
  Header,
  Footer,
  Content,
} from './components';

const DashboardLayout = ({
  children,
  PageHeader,
  loading,
  hideSidebar,
}) => (
  <Layout>
    <Header />
    <Spin size="large" spinning={loading}>
      <Content PageHeader={PageHeader} hideSidebar={hideSidebar}>
        {children}
      </Content>
    </Spin>
    <Footer />
  </Layout>
);

DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  PageHeader: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  loading: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.bool,
};

DashboardLayout.defaultProps = {
  PageHeader: null,
  hideSidebar: false,
};

export default DashboardLayout;
