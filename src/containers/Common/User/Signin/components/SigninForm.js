import React, { useEffect } from 'react';
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
import { login, loginError } from '~/containers/Common/User/actions';

function SigninForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['User', 'Global']);
  const { isLoading, error } = useSelector(state => state.user.auth);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    dispatch(loginError(null));
  }, []);

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      size="large"
    >
      { error && <Alert message={error} type="error" showIcon /> }
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

      <Form.Item
        label={t('Global:password')}
        name="password"
        rules={[
          { required: true },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Row>
        <Col span={8}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              { t('User:login') }
            </Button>
          </Form.Item>
        </Col>

        <Col span={8} offset={8}>
          <Button type="link" href="/forgotten-password">{t('User:forgot_your_password')}</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SigninForm;
