import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  PageHeader,
  Card,
  Divider,
  Button,
  Typography,
} from 'antd';
import { CheckOutlined, CopyOutlined, FileAddOutlined } from '@ant-design/icons';

import {
  fetchDocument,
  updateDocument,
  finalizeDocument,
  duplicateDocument,
} from '~/containers/MainApp/Document/actions';
import { InstanceModal } from '~/containers/MainApp/Instance';
import Layout from '~/containers/Common/Layout/Layout';
import { DocumentViewer, AttachedFiles } from '~/lab';
import {
  EditDocumentInfosModal,
  SelectInstanceModal,
  EditSectionModal,
  InstancesTree,
} from './components';
import { getEntitiesByID } from '~/containers/Common/HomePage/Selectors';

function DocumentPage(props) {
  const { t } = useTranslation(['Global', 'Document']);
  const selectInstanceModalRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { docId } = useParams();
  const {
    isFetching,
    isUpdating,
    isFinalizing,
    isDuplicating,
    details,
  } = useSelector(state => state.document);

  const entities = useSelector(getEntitiesByID);

  const [currentEntityTab, setCurrentEntityTab] = useState();
  const [showEntitiesTabs, setShowEntitiesTabs] = useState(true);
  const [sectionToEdit, setSectionToEdit] = useState(null);
  const [documentInfoModalData, setDocumentInfoModalData] = useState({ visible: false });
  const [currentNewInstanceEntity, setCurrentNewInstanceEntity] = useState();
  const [instanceEntityData, setInstanceEntityData] = useState();

  const fetchDocumentDetails = () => {
    dispatch(fetchDocument(docId));
  };

  const onUpdateDocument = (data, callback) => {
    const currentTab = currentEntityTab;
    dispatch(updateDocument(
      docId,
      data,
      () => {
        setCurrentEntityTab(currentTab);
        if (typeof callback === 'function') {
          callback();
        }
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
    ));
  };

  const onCloseEditDocumentInfoModal = () => {
    setDocumentInfoModalData({ visible: false });
  };

  const onOpenEditDocumentInfoModal = (info) => {
    setDocumentInfoModalData({ visible: true, data: { [info]: details[info] } });
  };

  // Generate the resources tabs list
  const resourceTabs = useMemo(() => {
    if (!details?.Template?.templateEntities) {
      return [];
    }

    const tabs = details?.Template?.templateEntities?.map(item => ({
      key: `entity_${item.id}`,
      tab: item.name,
    }));

    tabs.push({
      key: 'attachedFiles',
      tab: (
        <Typography.Text type="success">
          <FileAddOutlined />
          {t('Global:attached_files')}
        </Typography.Text>
      ),
    });

    setCurrentEntityTab(tabs?.[0]?.key);
    return tabs;
  }, [details]);

  // Generate the resource tabs contents
  const entitiesTabsContent = useMemo(() => {
    if (
      !showEntitiesTabs
      || !details?.Template?.templateEntities
    ) {
      return {};
    }

    const contents = {};

    details?.Template?.templateEntities.forEach(item => {
      /*
      const numberOfInstancePerTemplateEntity = details?.documentInstances?.[item?.id]?.length;

      // To define if the selection will be disabled or not
      let disableSelectionButtons = false;
      if (!item.multiple) {
        disableSelectionButtons = numberOfInstancePerTemplateEntity >= 1;
      }

      // To define if we show the alert message to the user
      let resourceIsRequired = false;
      if (item.required) {
        resourceIsRequired = numberOfInstancePerTemplateEntity === 0;
      }
      */

      const entity = entities?.[item?.EntityId] || {};
      contents[`entity_${item.id}`] = (
        <InstancesTree
          templateEntityId={item.id}
          data={details?.documentInstances?.[item?.id]}
          entity={entity}
          // disableSelectionButtons={disableSelectionButtons}
          showSelectedDataOnly={details?.isFinalised}
          onSelectionUpdate={onUpdateDocument}
          /*
          displayMessage={
            resourceIsRequired && (
              <Alert message={t('Document:resource_required')} type="warning" showIcon />
            )
          }
          */
          onOpenSelectionInstance={setInstanceEntityData}
        />
      );
    });

    contents.attachedFiles = (
      <AttachedFiles
        attachedFiles={details?.attachedFiles}
        id={{ DocumentId: docId }}
      />
    );
    return contents;
  }, [showEntitiesTabs, details, currentEntityTab, docId]);

  const toggleResourcesTabs = useMemo(() => (
    <a href="#" onClick={() => setShowEntitiesTabs(!showEntitiesTabs)}>
      {showEntitiesTabs ? t('Global:hide_details') : t('Global:show_details')}
    </a>
  ), [showEntitiesTabs, t]);

  useEffect(() => {
    fetchDocumentDetails();
  }, [docId]);

  const disableFinalizeButton = useMemo(() => {
    let requiredResourceMissing = false;
    details?.Template?.templateEntities.forEach(item => {
      if (
        item.required
        && (
          !details?.documentInstances?.[item?.id]
          || details?.documentInstances?.[item?.id]?.length === 0
        )
      ) {
        requiredResourceMissing = true;
      }
    });
    return requiredResourceMissing;
  }, [details]);

  const onInstanceCreated = useCallback((/* instance */) => {
    selectInstanceModalRef?.current?.refreshTheContent();
    setCurrentNewInstanceEntity();
  }, [selectInstanceModalRef]);

  const onFinalizeDocument = () => {
    dispatch(finalizeDocument(docId));
  };

  const onDuplicateDocument = () => {
    dispatch(duplicateDocument(
      docId,
      (newDocument) => history.push(`/document/edit/${newDocument?.id}`),
    ));
  };

  const actionButtons = useMemo(() => {
    const buttons = [];

    if (details?.isFinalised === false) {
      buttons.push(
        <Button
          type="primary"
          icon={<CheckOutlined />}
          size="large"
          shape="round"
          onClick={onFinalizeDocument}
          disabled={disableFinalizeButton}
          loading={isFinalizing}
          key="cta_finalize_document"
        >
          { t('Document:finalize_document') }
        </Button>,
      );
    } else {
      buttons.push(
        <Button
          type="primary"
          icon={<CopyOutlined />}
          size="large"
          shape="round"
          onClick={onDuplicateDocument}
          loading={isDuplicating}
          key="cta_duplicate_document"
        >
          { t('Document:duplicate_document') }
        </Button>,
      );
    }
    return buttons;
  }, [details, isDuplicating, isFinalizing]);

  const onClickSection = (input) => {
    setSectionToEdit(input);
  };

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          onBack={history.goBack}
          title={`${t('Document:document_details')} ${details ? `(${details?.Template?.Category?.name})` : ''}`}
          extra={details && !details?.isFinalised && [
            <Button
              type="primary"
              onClick={() => onOpenEditDocumentInfoModal('date')}
              loading={isUpdating}
              key="cta_edit_date"
            >
              { t('Document:edit_date') }
            </Button>,
            <Button
              type="primary"
              onClick={() => onOpenEditDocumentInfoModal('reference')}
              loading={isUpdating}
              key="cta_edit_refrence"
            >
              { t('Document:edit_reference') }
            </Button>,
          ]}
        />
      )}
      loading={isFetching || isUpdating}
    >
      { details && (
        <>
          <Card
            tabList={resourceTabs}
            activeTabKey={currentEntityTab}
            onTabChange={(v) => {
              if (v !== currentEntityTab) {
                setCurrentEntityTab(undefined);
                setTimeout(() => {
                  setCurrentEntityTab(v);
                }, 0);
              }
            }}
            tabBarExtraContent={toggleResourcesTabs}
          >
            {entitiesTabsContent[currentEntityTab]}
          </Card>
          <Divider />
        </>
      )}

      <DocumentViewer
        documentDetails={details}
        loading={isFetching}
        extraButtons={actionButtons}
        onClickSection={onClickSection}
      />

      <EditSectionModal
        onClose={() => setSectionToEdit(null)}
        data={sectionToEdit}
        onEditDone={onUpdateDocument}
      />

      <EditDocumentInfosModal
        visible={documentInfoModalData.visible}
        onClose={onCloseEditDocumentInfoModal}
        data={documentInfoModalData.data}
        onEditDone={onUpdateDocument}
      />

      <SelectInstanceModal
        ref={selectInstanceModalRef}
        onClose={() => setInstanceEntityData(null)}
        data={instanceEntityData}
        onSelectInstance={(params) => {
          onUpdateDocument(params);
          setInstanceEntityData(null);
        }}
        onCreateInstance={() => {
          const ent = entities?.[instanceEntityData?.templateEntity?.id];
          if (ent) {
            const { relationshipTos, relationshipFroms, ...rest } = ent;
            setCurrentNewInstanceEntity({
              ...rest,
              // To link the created entity with the parent entity
              ParentInstanceId: instanceEntityData?.ParentInstanceId,
              ParentTemplateEntityId: instanceEntityData?.templateEntity?.id,
              EntityRelationship: instanceEntityData?.EntityRelationship,
            });
            // setInstanceEntityData(null);
          }
        }}
      />
      <InstanceModal
        visible={!!currentNewInstanceEntity}
        onClose={() => setCurrentNewInstanceEntity()}
        onDone={onInstanceCreated}
        entity={currentNewInstanceEntity || {}}
      />
    </Layout>
  );
}

export default DocumentPage;
