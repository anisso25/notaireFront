import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Skeleton,
  Alert,
  PageHeader,
  Card,
} from 'antd';
import Layout from '~/containers/Common/Layout/Layout';
import {
  fetchOfficeInfo,
  fetchOfficeInfoError,
  updateOfficeInfo,
} from '~/containers/Common/User/actions';
import validationRules from '~/utils/validationRules';

function OfficeInfo(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['Global', 'User']);
  const {
    isFetching,
    isUpdating,
    error,
    data: user,
    inputErrors,
  } = useSelector(state => state.user?.userInfo);

  const [tempInputErrors, setTempInputErrors] = useState(inputErrors);

  const onFinish = (values) => {
    dispatch(updateOfficeInfo(values));
  };

  useEffect(() => {
    dispatch(fetchOfficeInfoError());
    dispatch(fetchOfficeInfo());
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
          title={t('User:edit_office_infos')}
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
                initialValues={user?.Office}
                onFinish={onFinish}
                onValuesChange={onFieldsChange}
              >
                { error && <Alert message={error} type="error" showIcon /> }

                <Form.Item
                  label={t('Global:reference')}
                  name="reference"
                  validateStatus={tempInputErrors?.reference && 'error'}
                  help={tempInputErrors?.reference}
                  rules={[
                    validationRules.required,
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={t('User:office_name')}
                  name="name"
                  validateStatus={tempInputErrors?.name && 'error'}
                  help={tempInputErrors?.name}
                  rules={[
                    validationRules.required,
                    validationRules.string,
                    validationRules.minChar(2),
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={t('Global:address')}
                  name="address"
                  validateStatus={tempInputErrors?.address && 'error'}
                  help={tempInputErrors?.address}
                  rules={[
                    validationRules.required,
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isUpdating}>
                    { t('Global:edit') }
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

export default OfficeInfo;
