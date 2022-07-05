import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'antd';

import formInputsBuilder from '~/utils/formBuilder';
import employeesColumns from '~/containers/MainApp/Employee/columns';
import {
  createEmployee,
  updateEmployee,
} from '~/containers/MainApp/Employee/actions';
import { loginSuccess } from '~/containers/Common/User/actions';

function EmployeeModal({
  visible,
  onClose,
  onDone,
  record,
}) {
  const { t } = useTranslation(['Employee', 'Global']);
  const dispatch = useDispatch();
  const { isCreating, isUpdating, inputErrors } = useSelector(state => state.employee);
  const { data: myProfile } = useSelector(state => state.user.userInfo);
  const { token } = useSelector(state => state.user.auth);

  const [tempInputErrors, setTempInputErrors] = useState(inputErrors);
  const [form] = Form.useForm();

  const onCreate = (values) => {
    dispatch(
      createEmployee(
        {
          ...values,
          confirm_password: values.password,
        },
        (employee) => {
          onDone(employee);
          onClose();
        },
      ),
    );
  };

  const onUpdate = (values) => {
    dispatch(
      updateEmployee(
        record?.id,
        values,
        (employee) => {
          if (myProfile?.id === employee?.id) {
            dispatch(
              loginSuccess({
                ...(myProfile || {}),
                token,
                email: employee.email,
                name: employee.name,
              }),
            );
          }
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

  const columns = useMemo(() => employeesColumns(t, record ? 'update' : 'create'), [record, t]);
  return (
    <Modal
      title={
        record
          ? t('Employee:cta_edit')
          : t('Employee:cta_new')
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
        initialValues={record}
        onValuesChange={onFieldsChange}
      >
        { formInputsBuilder(columns, tempInputErrors) }
      </Form>
    </Modal>
  );
}

export default EmployeeModal;
