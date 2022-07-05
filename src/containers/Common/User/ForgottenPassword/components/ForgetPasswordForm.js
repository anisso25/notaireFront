import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Input,
  Button,
  Alert,
  Row,
  Col,
} from 'antd';

import { forgetPassword, forgetPasswordError } from '~/containers/Common/User/actions';

function ForgetPasswordForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['User', 'Global']);
  const { isLoading, error } = useSelector(state => state.user.auth);
  const [emailSent, setEmailSent] = useState(false);
  const onFinish = (values) => {
    dispatch(forgetPassword(
      values,
      () => setEmailSent(true),
      () => setEmailSent(false),
    ));
  };

  useEffect(() => {
    dispatch(forgetPasswordError(null));
  }, []);

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      size="large"
    >
      {emailSent && (
        <>
          <br />
          <br />
          <Alert message={t('User:recovery_email_sent')} type="success" showIcon />
          <br />
        </>
      )}
      { error && <Alert message={error} type="error" showIcon /> }
      {!emailSent && (
        <Form.Item
          label={t('Global:email')}
          name="email"
          rules={[
            { required: true },
            { type: 'email' },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      <Row>
        <Col span={8}>
          {!emailSent && (
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                { t('User:send_recovery_email') }
              </Button>
            </Form.Item>
          )}
        </Col>

        <Col span={8} offset={8}>
          <Button type="link" href="/signin">{t('User:back_to_login')}</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ForgetPasswordForm;
