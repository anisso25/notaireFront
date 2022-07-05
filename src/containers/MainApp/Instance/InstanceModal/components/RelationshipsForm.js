import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Tooltip,
  Tabs,
} from 'antd';
import { FormOutlined, FileAddOutlined } from '@ant-design/icons';

import SelectableList from '~/containers/MainApp/Instance/components/SelectableList';
import RelationshipAdditionalInfoModal from './RelationshipAdditionalInfoModal';
import RelationshipAttachedFilesModal from './RelationshipAttachedFilesModal';
import { getEntitiesByID } from '~/containers/Common/HomePage/Selectors';

const { TabPane } = Tabs;

function RelationshipsForm({
  relationships,
  records,
  onRelationshipsUpdate,
  onCreateRelationship,
  activeTab,
}) {
  const { t } = useTranslation(['Instance', 'Global']);
  const entities = useSelector(getEntitiesByID);
  const [relations, setRelations] = useState({});

  const [
    relationshipAdditionalInformationData,
    setRelationshipAdditionalInformationData,
  ] = useState();

  const [attachedFilesData, setAttachedFilesData] = useState();

  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab);

  const flattenRelationsList = useMemo(() => (
    Object.values(relations).flat(Infinity) || []
  ), [relations]);

  const getAdditionalRelationshipInfo = useCallback((selectionId) => (
    flattenRelationsList?.find(
      item => item?.id === selectionId,
    )?.AdditionalRelationshipInfo
  ), [flattenRelationsList]);

  useEffect(() => {
    const temp = {};
    relationships?.forEach(item => {
      temp[item?.id] = records?.filter(inst => inst?.instance?.EntityId === item.EntityId)
        ?.map(inst => ({
          ...inst,
          ...inst?.instance?.attributes,
        }));
    });

    setRelations(temp);
  }, []);

  useEffect(() => {
    onRelationshipsUpdate(Object.values(relations).flat(Infinity));
  }, [relations]);

  const onUpdate = useCallback((data, EntityRelationshipId) => {
    const temp = relations;
    temp[EntityRelationshipId] = data?.map(instance => ({
      ...instance,
      AdditionalRelationshipInfo: getAdditionalRelationshipInfo(instance?.id),
    }));
    setRelations({ ...temp });
  }, [relations, flattenRelationsList]);

  const onEditAdditionalRelationshipInfoDone = useCallback((selectionId, values) => {
    const temp = {};
    Object.entries(relations).forEach(item => {
      temp[item?.[0]] = item?.[1]?.map(instance => {
        if (selectionId === instance.id) {
          return {
            ...instance,
            AdditionalRelationshipInfo: values,
          };
        }
        return instance;
      });
    });
    setRelations({ ...temp });
    setRelationshipAdditionalInformationData();
  }, [relations]);

  const onOpenEditAdditionalRelationshipInfo = useCallback(
    (selectionId, instanceId, attributes) => {
      if (attributes?.length === 0) {
        return false;
      }

      let values = getAdditionalRelationshipInfo(selectionId);
      if (!values) {
        values = records?.find(item => item?.id === selectionId)?.attributes;
      }

      setRelationshipAdditionalInformationData({
        id: selectionId,
        instanceId,
        attributes,
        values,
      });
      return true;
    }, [records, getAdditionalRelationshipInfo],
  );

  const onOpenAttachedFilesModal = useCallback((record) => {
    setAttachedFilesData({
      attachedFiles: record?.attachedFiles,
      relatedToId: { InstanceRelationshipId: record?.relationshipId },
    });
  }, [records, getAdditionalRelationshipInfo]);

  const additionalActions = useCallback((record, relationshipAttribute) => {
    if (relationshipAttribute?.length === 0) {
      return undefined;
    }
    return [
      <Tooltip title={t('Instance:edit_additional_relationship_info')} key="cta_edit_additional_info">
        <Button
          size="small"
          icon={<FormOutlined />}
          onClick={() => onOpenEditAdditionalRelationshipInfo(
            record?.id, record?.instanceId, relationshipAttribute,
          )}
        >{t('Instance:additional_relationship_info')}
        </Button>
      </Tooltip>,
      record?.attachedFiles && record?.relationshipId && (
        <Tooltip title={t('Global:attached_files')} key="cta_attached_files">
          <Button
            size="small"
            icon={<FileAddOutlined />}
            onClick={() => onOpenAttachedFilesModal(record)}
          >{t('Global:attached_files')}
          </Button>
        </Tooltip>
      ),
    ];
  }, [flattenRelationsList, relations]);

  const onListFilesUpdated = useCallback((id, files) => {
    const temp = relations;
    Object.keys(temp)?.forEach(EntityRelationshipId => {
      temp[EntityRelationshipId] = temp[EntityRelationshipId].map(rel => {
        if (rel?.relationshipId === id?.InstanceRelationshipId) {
          return {
            ...rel,
            attachedFiles: files,
          };
        }
        return rel;
      });
    });
    setRelations({ ...temp });
  }, [relations]);

  return (
    <>
      <Tabs
        type="card"
        activeKey={currentActiveTab}
        onChange={setCurrentActiveTab}
      >
        {relationships?.map(item => {
          const entityData = entities?.[item.EntityId] || {};
          const tabKey = `relationship_tab_${item.EntityId}`;
          return (
            <TabPane tab={item?.name} key={tabKey}>
              <SelectableList
                // This must be refactored later :(
                data={records?.filter(inst => inst?.instance?.EntityId === item.EntityId)
                  .map(inst => ({
                    ...inst,
                    ...inst?.instance?.attributes,
                  }))}
                entity={entityData}
                relationship={item}
                withPagination={false}
                onRelationshipsUpdate={(data) => onUpdate(data, item?.id)}
                disableSelectionButtons={false}
                onCreateInstance={() => {
                  onCreateRelationship(entityData, tabKey);
                }}
                additionalActions={(record) => additionalActions(record, item?.attributes)}
                onOpenEditAdditionalRelationshipInfo={
                  (selectionId, instanceId) => onOpenEditAdditionalRelationshipInfo(
                    selectionId, instanceId, item?.attributes,
                  )
                }
              />
            </TabPane>
          );
        })}
      </Tabs>
      <RelationshipAdditionalInfoModal
        onClose={() => setRelationshipAdditionalInformationData()}
        data={relationshipAdditionalInformationData}
        onEditDone={onEditAdditionalRelationshipInfoDone}
      />

      <RelationshipAttachedFilesModal
        onClose={() => setAttachedFilesData()}
        data={attachedFilesData}
        onListUpdated={onListFilesUpdated}
      />

    </>
  );
}
export default RelationshipsForm;
