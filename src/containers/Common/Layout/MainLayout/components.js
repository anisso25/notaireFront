import styled from 'styled-components';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';

const Content = styled(Layout.Content)`
  padding: 30px 50px;
  min-height: calc(100vh - 128px);
  height: 100%;
`;

export {
  Header,
  Footer,
  Content,
};
