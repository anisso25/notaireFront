import React from 'react';
import { Row, Col } from 'antd';
import Layout from '~/containers/Common/Layout/Layout';
import ForgetPasswordForm from './components/ForgetPasswordForm';

function ForgottenPassword(props) {
  return (
    <Layout {...props}>
      <Row>
        <Col span={8} offset={8}>
          <ForgetPasswordForm />
        </Col>
      </Row>
    </Layout>
  );
}

export default ForgottenPassword;
