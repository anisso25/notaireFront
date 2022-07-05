import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';

import {
  Modal,
  Input,
  DatePicker,
  Form,
} from 'antd';

function EditDocumentInfosModal({
  visible,
  onClose,
  onEditDone,
  data,
}) {
  const { t } = useTranslation(['Document', 'Global']);
  const { isUpdating } = useSelector(state => state.document);
  const [documentData, setDocumentData] = useState(data);

  const handleSubmit = () => {
    onEditDone(
      { ...documentData },
      onClose,
    );
  };

  useEffect(() => {
    setDocumentData(data);
  }, [data]);

  return (
    <Modal
      title={t('Document:edit_document_infos')}
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={isUpdating}
      okText={t('Global:edit')}
    >
      <Form layout="vertical">
        {documentData?.reference && (
          <Form.Item label={t('Document:reference')}>
            <Input
              onChange={(event) => setDocumentData(c => ({ ...c, reference: event.target.value }))}
              value={documentData?.reference}
            />
          </Form.Item>
        )}

        {documentData?.date && (
          <Form.Item label={t('Global:date')}>
            <DatePicker
              onChange={(val) => setDocumentData(c => ({ ...c, date: val?.format('YYYY-MM-DD') }))}
              value={moment(documentData?.date)}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default EditDocumentInfosModal;
