import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'antd';

import formInputsBuilder from '~/utils/formBuilder';
import categoriesColumns from '~/containers/Backoffice/Category/columns';
import {
  createCategory,
  updateCategory,
} from '~/containers/Backoffice/Category/actions';

function CategoryModal({
  visible,
  onClose,
  onDone,
  record,
}) {
  const { t } = useTranslation(['AppManagement', 'Global']);
  const dispatch = useDispatch();
  const { isCreating, isUpdating, inputErrors } = useSelector(state => state.category);

  const [tempInputErrors, setTempInputErrors] = useState(inputErrors);
  const [form] = Form.useForm();

  const onCreate = (values) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('icon', values?.icon?.file);

    dispatch(
      createCategory(
        formData,
        (category) => {
          onDone(category);
          onClose();
        },
      ),
    );
  };

  const onUpdate = (values) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    if (values?.icon?.file) {
      formData.append('icon', values?.icon?.file);
    }
    dispatch(
      updateCategory(
        record?.id,
        formData,
        () => {
          onDone();
          onClose();
        },
      ),
    );
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (record) {
          onUpdate(values);
        } else {
          onCreate(values);
        }
      })
      .catch(() => {});
  };

  const onFieldsChange = () => {
    // To handle later : clear the error of the edited input only
    setTempInputErrors([]);
  };

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  useEffect(() => {
    setTempInputErrors(inputErrors);
  }, [inputErrors]);

  const columns = useMemo(() => categoriesColumns(t, record ? 'update' : 'create'), [record, t]);
  return (
    <Modal
      title={
        record
          ? t('AppManagement:category.cta_edit')
          : t('AppManagement:category.cta_new')
      }
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={isCreating || isUpdating}
      okText={
        record
          ? t('Global:edit')
          : t('Global:add')
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: record?.name,
          icon_url: record?.icon,
        }}
        onValuesChange={onFieldsChange}
      >
        { formInputsBuilder(columns, tempInputErrors) }
      </Form>
    </Modal>
  );
}

export default CategoryModal;
