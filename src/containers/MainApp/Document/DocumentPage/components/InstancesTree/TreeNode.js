import React, {
  useState, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  Space,
  Tooltip,
  Popconfirm,
  Popover,
  Typography,
} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  PlusOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';

import {
  TitleContainer, Title, SmallButton, TheTable,
} from './components';
import AdditionalRelationshipInfoModal from './AdditionalRelationshipInfoModal';

function TreeNode({
  treeKey,
  Instance,
  TemplateEntity,
  attributes: additionalRelationshipInfo,
  // TemplateEntityId,
  title,
  id,
  DocumentInstanceId,
  InstanceRelationshipId,
  attachedFiles,
  getPath,
  onSelectionUpdate,
  onOpenSelectionInstance,
  onShowAttachedFiles = () => {},
}) {
  const { t } = useTranslation(['Global']);
  const [showData, setShowData] = useState(true);

  const path = useMemo(getPath, [id, getPath]);

  const getUnselectionParams = useCallback(() => {
    if (!path) {
      return null;
    }
    switch (path?.length) {
      case 1: // Root
        return ({
          isRoot: true,
          id: DocumentInstanceId, // DocumentinstanceId
        });
      case 2: // Child of Root
        return ({
          isRoot: false,
          id: InstanceRelationshipId, // instanceRelationshipId
        });
      default: // Child of Child
        return ({
          isRoot: false,
          id: InstanceRelationshipId, // instanceRelationshipId
        });
    }
  }, [path]);

  const onToggleDataTable = (event) => {
    event.stopPropagation();
    setShowData(!showData);
  };

  const onUnselectInstance = useCallback((event) => {
    event.stopPropagation();
    onSelectionUpdate({
      deleteResource: getUnselectionParams(),
    });
  }, [path]);

  const onSelectInstance = useCallback((event, entity) => {
    event.stopPropagation();
    const EntityRelationship = entity?.relationshipFroms?.find(
      item => item.EntityId === Instance?.EntityId,
    );
    onOpenSelectionInstance({
      templateEntity: entity,
      ParentId: InstanceRelationshipId,
      DocumentInstanceId,
      EntityRelationship,
      pathDepth: path?.length + 1, // The depth of the relationship to add
    });
  }, [path]);

  const content = useMemo(() => (
    <>
      <TitleContainer key={treeKey}>
        <Title>{title}</Title>
        {TemplateEntity && (
          <Space>
            {TemplateEntity?.relationshipTos?.map(item => (
              <Tooltip title={t('Global:select_x', { name: item?.name })} key="cta_select_instance">
                <SmallButton
                  type="primary"
                  size="small"
                  onClick={(event) => onSelectInstance(event, item)}
                >{ item?.name } <PlusOutlined />
                </SmallButton>
              </Tooltip>
            ))}

            <Tooltip
              title={showData ? t('Global:hide_details') : t('Global:show_details')}
              key="cta_toggle_instance_data"
            >
              <SmallButton
                type="primary"
                size="small"
                icon={showData ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                shape="circle"
                onClick={onToggleDataTable}
                style={{ display: 'none' }}
              />
            </Tooltip>

            {!!attachedFiles?.length && (
              <Tooltip title={t('Global:attached_files')} key="cta_attached_files">
                <SmallButton
                  type="primary"
                  size="small"
                  icon={<PaperClipOutlined />}
                  shape="circle"
                  onClick={() => onShowAttachedFiles(attachedFiles)}
                />
              </Tooltip>
            )}
            <Popconfirm
              title={t('Global:are_you_sure')}
              onConfirm={onUnselectInstance}
              okText={t('Global:yes')}
              cancelText={t('Global:no')}
            >
              <Tooltip title={t('Global:delete')} key="cta_unselect_instance">
                <SmallButton
                  type="primary"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  shape="circle"
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        )}
      </TitleContainer>
      {TemplateEntity && showData && (
        <TheTable
          dataSource={[
            { ...Instance?.attributes, attachedFiles: Instance?.attachedFiles },
          ]}
          columns={TemplateEntity?.columns.concat({
            title: t('Global:attached_files'),
            dataIndex: 'attachedFiles',
            key: 'attachedFiles',
            render: (files) => (
              // eslint-disable-next-line react/destructuring-assignment
              files?.length > 0 ? (
                <Tooltip title={t('Global:attached_files')} key="cta_attached_files">
                  <SmallButton
                    type="default"
                    size="small"
                    icon={<PaperClipOutlined />}
                    shape="circle"
                    onClick={() => onShowAttachedFiles(files)}
                  />
                </Tooltip>
              ) : <Typography.Text type="danger">{t('Global:not_available')}</Typography.Text>
            ),
          })}
          size="small"
          pagination={false}
          bordered
          scroll={{ x: 'max-content' }}
          rowKey={record => `selected_instance_${record?.id}`}
        />
      )}
    </>
  ), [TemplateEntity, treeKey, showData, title]);

  return (
    Object.keys(additionalRelationshipInfo || {})?.length > 0
      ? (
        <Popover
          content={<AdditionalRelationshipInfoModal data={additionalRelationshipInfo} />}
          title={t('Instance:additional_relationship_info')}
        >
          <div>{content}</div>
        </Popover>
      ) : content
  );
}

export default TreeNode;
