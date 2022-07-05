import styled from 'styled-components';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const Container = styled(Layout.Content)`
  padding: ${props => (!props.$withPageHeader ? '50px 50px' : '0px 50px 50px')};
  min-height: calc(100vh - 128px);
  height: 100%;
`;

const ContentSpace = styled.div`
  min-height: 300px;
  padding: 0 24px; 
  width: 100%;
`;

const Content = ({ children, PageHeader, hideSidebar }) => (
  <Layout>
    { !hideSidebar && <Sidebar /> }
    <Container $withPageHeader={!!PageHeader}>
      {PageHeader}
      <ContentSpace>
        {children}
      </ContentSpace>
    </Container>
  </Layout>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  PageHeader: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  hideSidebar: PropTypes.bool,
};

Content.defaultProps = {
  PageHeader: null,
  hideSidebar: false,
};

export {
  Header,
  Footer,
  Content,
};
