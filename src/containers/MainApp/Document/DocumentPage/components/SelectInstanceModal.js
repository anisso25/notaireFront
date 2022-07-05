import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  Button,
} from 'antd';
import SelectableList from '~/containers/MainApp/Instance/components/SelectableList';

function SelectInstanceModal({
  onClose,
  data,
  onSelectInstance = () => {},
  onCreateInstance = () => {},
}, forwardedRef) {
  const { t } = useTranslation(['Global']);
  // To refresh the modal content
  const [showModalContent, setShowModalContent] = useState(false);

  const refreshTheContent = () => {
    setShowModalContent(false);
    setTimeout(() => setShowModalContent(true), 0);
  };

  useImperativeHandle(forwardedRef, () => ({ refreshTheContent }));

  useEffect(() => {
    refreshTheContent();
  }, [data]);

  const getSelectionParams = useCallback((record) => {
    const InstanceRelationshipId = record?.relationshipFroms?.find(
      item => String(item.instance.id) === String(data?.ParentInstanceId),
    )?.relationshipId;
    switch (data?.pathDepth) {
      case 1: // Root
        return ({
          isRoot: true,
          TemplateEntityId: data?.templateEntityId,
          InstanceId: record.instanceId,
        });
      case 2: // Child of Root
        return ({
          parentIsRoot: true,
          DocumentInstanceId: data?.DocumentInstanceId,
          InstanceRelationshipId,
        });
      default: // Child of Child
        return ({
          ParentId: data?.ParentId,
          InstanceRelationshipId,
        });
    }
  }, [data]);

  return (
    <Modal
      ref={forwardedRef}
      title={t('Global:select_x', { name: data?.templateEntity.name })}
      visible={!!data}
      onCancel={onClose}
      width="80%"
      footer={[
        <Button
          type="default"
          onClick={onClose}
        >{t('Global:cancel')}
        </Button>,
      ]}
    >
      {showModalContent && (
        <SelectableList
          entity={data?.templateEntity}
          additionalSearchParams={{
            ParentInstanceId: data?.ParentInstanceId || '',
          }}
          hideSelectedData
          onSelectionUpdate={(action, record) => {
            onSelectInstance({
              addResource: getSelectionParams(record),
            });
          }}
          onCreateInstance={onCreateInstance}
        />
      )}
    </Modal>
  );
}

export default forwardRef(SelectInstanceModal);
