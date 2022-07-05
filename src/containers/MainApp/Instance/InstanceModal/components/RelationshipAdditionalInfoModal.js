import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Modal, Form, Button } from 'antd';

import formInputsBuilder from '~/utils/formBuilder';
import tableColumnsBuilder from '~/utils/tableColumnsBuilder';

function RelationshipAdditionalInfoModal({
  closable = true,
  onClose,
  data,
  onEditDone,
}, forwardedRef) {
  const { t } = useTranslation(['Global']);
  const [form] = Form.useForm();

  // To refresh the modal content
  const [showModalContent, setShowModalContent] = useState(false);

  const refreshTheContent = () => {
    setShowModalContent(false);
    setTimeout(() => setShowModalContent(true), 0);
  };

  useImperativeHandle(forwardedRef, () => ({ }));

  const columns = useMemo(() => (
    tableColumnsBuilder(data?.attributes || [])
  ), [data]);

  const attributeNameToId = useMemo(() => {
    const temp = {};
    columns.forEach(item => {
      temp[item.title] = item.EntityAttributeId;
    });
    return temp;
  }, [columns]);

  const idToAttributeName = useMemo(() => {
    const temp = {};
    columns.forEach(item => {
      temp[item.EntityAttributeId] = item.title;
    });
    return temp;
  }, [columns]);

  useEffect(() => {
    let temp = {};
    if (Array.isArray(data?.values)) {
      data?.values?.forEach(item => {
        temp[idToAttributeName?.[item?.EntityRelationshipAttributeId]] = item?.value;
      });
    } else {
      temp = { ...data?.values };
    }

    Object.keys(temp).forEach(key => {
      if (
        moment(temp[key], 'YYYY-MM-DD', true).isValid()
        || moment(temp[key], 'YYYY-MM-DD HH:mm:ss', true).isValid()
      ) {
        temp[key] = moment(temp[key]);
      }
    });

    refreshTheContent();
    form.setFieldsValue(temp);
  }, [data?.values, idToAttributeName]);

  useEffect(() => {
    // To reset the form when the modal close
    if (!data) {
      form.resetFields();
    }
  }, [data]);

  const handleSubmit = useCallback(() => {
    form.validateFields()
      .then(values => {
        onEditDone(
          data?.id,
          Object.entries(values || {}).map(item => {
            let value = item?.[1];
            if (moment.isMoment(value)) {
              value = value.format('YYYY-MM-DD');
            }
            return {
              EntityRelationshipAttributeId: attributeNameToId?.[item?.[0]],
              value,
            };
          }),
        );
      })
      .catch(() => {});
  }, [onEditDone, data]);

  return (
    <Modal
      ref={forwardedRef}
      title={t('Instance:edit_additional_relationship_info')}
      visible={!!data}
      closable={false}
      footer={[
        closable && (
          <Button
            type="default"
            onClick={onClose}
            key="cta_cancel"
          >{t('Global:cancel')}
          </Button>
        ),
        <Button
          type="primary"
          onClick={handleSubmit}
          key="cta_submit"
        >{t('Global:edit')}
        </Button>,
      ]}
    >
      {showModalContent && (
        <Form
          form={form}
          layout="vertical"
        >
          { formInputsBuilder(columns).map(
            item => item && React.cloneElement(item, { rules: [] }),
          ) }
        </Form>
      )}
    </Modal>
  );
}

export default forwardRef(RelationshipAdditionalInfoModal);
