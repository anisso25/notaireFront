import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Input,
  Row,
  Col,
  Skeleton,
  Alert,
  Divider,
  PageHeader,
  Button,
  Card,
} from 'antd';
import Layout from '~/containers/Common/Layout/Layout';
import {
  fetchProfile,
  fetchProfileError,
  loginSuccess,
} from '~/containers/Common/User/actions';
// To change
import { updateEmployee } from '~/containers/MainApp/Employee/actions';
import validationRules from '~/utils/validationRules';

function Profile(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['User', 'Global']);
  const {
    isFetching,
    error,
    data: user,
  } = useSelector(state => state.user.userInfo);

  const { token } = useSelector(state => state.user.auth);

  const { isUpdating, inputErrors } = useSelector(state => state.employee);
  const [tempInputErrors, setTempInputErrors] = useState(inputErrors);

  const onFinish = (values) => {
    const tempData = values;
    Object.keys(tempData).forEach(key => (tempData[key] === undefined ? delete tempData[key] : {}));

    dispatch(
      updateEmployee(
        user?.id,
        tempData,
        (employee) => {
          dispatch(
            loginSuccess({
              ...user,
              token,
              email: employee.email,
              name: employee.name,
            }),
          );
        },
      ),
    );
  };

  useEffect(() => {
    dispatch(fetchProfileError());
    dispatch(fetchProfile());
  }, []);

  const onFieldsChange = () => {
    // To handle later : clear the error of the edited input only
    setTempInputErrors([]);
  };
  useEffect(() => {
    setTempInputErrors(inputErrors);
  }, [inputErrors]);

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          ghost
          onBack={() => window.history.back()}
          title={t('Global:my_profile')}
        />
      )}
    >
      <Card>
        <Row>
          <Col span={8} offset={8}>
            { isFetching && <Skeleton active /> }
            { !isFetching && (
              <Form
                layout="vertical"
                initialValues={user}
                onFinish={onFinish}
                onValuesChange={onFieldsChange}
              >
                { error && <Alert message={error} type="error" showIcon /> }
                <Form.Item
                  label={t('Global:name')}
                  name="name"
                  validateStatus={tempInputErrors?.name && 'error'}
                  help={tempInputErrors?.name}
                  rules={[
                    validationRules.required,
                    validationRules.lettersOnly,
                    validationRules.minChar(2),
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={t('Global:email')}
                  name="email"
                  validateStatus={tempInputErrors?.email && 'error'}
                  help={tempInputErrors?.email}
                  rules={[
                    validationRules.required,
                    validationRules.email,
                  ]}
                >
                  <Input />
                </Form.Item>

                <Divider>{ t('User:edit_password') }</Divider>

                <Form.Item
                  label={t('Global:password')}
                  name="password"
                  validateStatus={tempInputErrors?.password && 'error'}
                  help={tempInputErrors?.password}
                  rules={[
                    validationRules.minChar(6),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isUpdating}>
                    { t('User:edit_profile') }
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}

export default Profile;
