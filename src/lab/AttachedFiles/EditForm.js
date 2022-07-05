import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  Form, Button, Input, Space,
} from 'antd';
import validationRules from '~/utils/validationRules';

import { updateAttachedFile } from '~/containers/MainApp/Document/actions';

function EditForm({
  onFileUpdated,
  record,
  onCancel,
}) {
  const { t } = useTranslation(['Global']);
  const dispatch = useDispatch();

  const { isUpdatingAttachedFile, inputErrors } = useSelector(state => state.document);
  const [tempInputErrors, setTempInputErrors] = useState(inputErrors);

  const [form] = Form.useForm();

  useEffect(() => {
    setTempInputErrors(inputErrors);
  }, [inputErrors]);

  const onFinish = useCallback((values) => {
    dispatch(updateAttachedFile(
      record?.filename,
      {
        title: values?.title,
      },
      (file) => {
        onFileUpdated(file);
        onCancel();
      },
    ));
  }, [record]);

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record]);

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        label={t('Global:filename')}
        name="title"
        validateStatus={tempInputErrors?.title && 'error'}
        help={tempInputErrors?.title}
        rules={[
          validationRules.required,
          validationRules.minChar(2),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button onClick={onCancel}>{t('Global:cancel')}</Button>
          <Button type="primary" htmlType="submit" loading={isUpdatingAttachedFile}>{t('Global:edit')}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default EditForm;
