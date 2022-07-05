import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { AttachedFiles } from '~/lab';

function RelationshipAttachedFilesModal({
  data,
  onClose,
  canEditFiles = true,
  onListUpdated = () => {},
}) {
  const { t } = useTranslation(['Global']);

  // To refresh the modal content
  const [showModalContent, setShowModalContent] = useState(false);

  const refreshTheContent = () => {
    setShowModalContent(false);
    setTimeout(() => setShowModalContent(true), 0);
  };

  useEffect(() => {
    refreshTheContent();
  }, [data]);

  return (
    <Modal
      title={t('Global:attached_files')}
      visible={!!data}
      onCancel={onClose}
      width="60%"
      centered
      footer={null}
    >
      {showModalContent && (
        <AttachedFiles
          attachedFiles={data?.attachedFiles}
          id={data?.relatedToId}
          canEditFiles={canEditFiles}
          onListUpdated={onListUpdated}
        />
      )}
    </Modal>
  );
}

export default RelationshipAttachedFilesModal;
