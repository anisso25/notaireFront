import React, { useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button } from 'antd';

// eslint-disable-next-line import/no-cycle
import formInputsBuilder from '~/utils/formBuilder';
import validationRules from '~/utils/validationRules';

import {
  /*
  deleteAttachedFile,
  getAttachedFile,
  updateAttachedFile,
  */
  addAttachedFile,
} from '~/containers/MainApp/Document/actions';

function UploadForm({
  id,
  onFileUploaded,
}) {
  const { t } = useTranslation(['Global']);
  const dispatch = useDispatch();

  const { isAddingAttachedFile, inputErrors } = useSelector(state => state.document);
  const [tempInputErrors, setTempInputErrors] = useState(inputErrors);

  const [form] = Form.useForm();
  const columns = useMemo(() => (
    [
      {
        title: t('Global:filename'),
        type: 'text',
        dataIndex: 'title',
        key: 'title',
        validationRules: [
          validationRules.required,
          validationRules.minChar(2),
        ],
      },
      {
        title: t('Global:file'),
        type: 'file',
        dataIndex: 'filename',
        key: 'filename',
        buttonText: t('Global:choose_file'),
        validationRules: [
          validationRules.required,
          validationRules.file,
        ],
      },
    ]
  ), [t]);

  useEffect(() => {
    setTempInputErrors(inputErrors);
  }, [inputErrors]);

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('title', values?.title);
    formData.append('file', values?.filename?.file);

    Object.keys(id)?.forEach(key => {
      formData.append(key, id[key]);
    });
    dispatch(addAttachedFile(
      formData,
      (file) => {
        onFileUploaded(file);
        form.resetFields();
      },
    ));
  };

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      { formInputsBuilder(columns, tempInputErrors) }
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isAddingAttachedFile}>{t('Global:upload_file')}</Button>
      </Form.Item>
    </Form>
  );
}

export default UploadForm;
