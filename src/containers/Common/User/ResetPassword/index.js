import React from 'react';
import { Row, Col } from 'antd';
import Layout from '~/containers/Common/Layout/Layout';
import ResetPasswordForm from './components/ResetPasswordForm';

function ForgottenPassword(props) {
  return (
    <Layout {...props}>
      <Row>
        <Col span={8} offset={8}>
          <ResetPasswordForm />
        </Col>
      </Row>
    </Layout>
  );
}

export default ForgottenPassword;
