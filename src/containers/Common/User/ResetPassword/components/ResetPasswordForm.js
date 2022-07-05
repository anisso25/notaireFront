import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import {
  Form,
  Input,
  Button,
  Alert,
  Row,
  Col,
} from 'antd';

import { resetPassword, resetPasswordError } from '~/containers/Common/User/actions';
import { useQuery } from '~/hooks';

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { t } = useTranslation(['User', 'Global']);
  const { isLoading, error } = useSelector(state => state.user.auth);

  const onFinish = (values) => {
    dispatch(resetPassword({
      newPassword: values.newPassword,
      token: query.get('token'),
    },
    () => history.push('/signin')));
  };

  useEffect(() => {
    dispatch(resetPasswordError(null));
    if (!query.get('token')) {
      history.push('/signin');
    }
  }, []);

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      size="large"
    >
      { error && <Alert message={error} type="error" showIcon /> }
      <Form.Item
        label={t('User:new_password')}
        name="newPassword"
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
              { t('User:change_password') }
            </Button>
          </Form.Item>
        </Col>

        <Col span={8} offset={8}>
          <Button type="link" href="/signin">{t('User:back_to_login')}</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ResetPassword;
