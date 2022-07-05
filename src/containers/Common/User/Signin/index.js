import React from 'react';
import { Row, Col } from 'antd';
import SigninForm from './components/SigninForm';
import Layout from '~/containers/Common/Layout/Layout';

function Signin(props) {
  return (
    <Layout {...props}>
      <Row>
        <Col span={8} offset={8}>
          <SigninForm />
        </Col>
      </Row>
    </Layout>
  );
}

export default Signin;
