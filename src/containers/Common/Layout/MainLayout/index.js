import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd';
import {
  Header,
  Footer,
  Content,
} from './components';

const MainLayout = ({ children, loading }) => (
  <Layout>
    <Header />
    <Spin size="large" spinning={loading}>
      <Content>
        {children}
      </Content>
    </Spin>
    <Footer />
  </Layout>
);

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MainLayout;
