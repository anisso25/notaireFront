import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal, Form, Tabs, Row, Col, Button,
  Typography,
} from 'antd';
import moment from 'moment';
import { FileAddOutlined } from '@ant-design/icons';

import formInputsBuilder from '~/utils/formBuilder';
import tableColumnsBuilder from '~/utils/tableColumnsBuilder';
import RelationshipAdditionalInfoModal from './components/RelationshipAdditionalInfoModal';
import { AttachedFiles } from '~/lab';

import {
  createInstance,
  updateInstance,
} from '~/containers/MainApp/Instance/actions';

import RelationshipsForm from './components/RelationshipsForm';

const { TabPane } = Tabs;

function InstanceModal({
  visible,
  onClose,
  onDone,
  record,
  entity,
  onListFilesUpdated,
}) {
  const { t } = useTranslation(['Instance', 'Global']);
  const dispatch = useDispatch();
  const { isCreating, isUpdating, inputErrors } = useSelector(state => state.instance);
  const [tempInputErrors, setTempInputErrors] = useState(inputErrors);

  const [
    relationshipAdditionalInformationData,
    setRelationshipAdditionalInformationData,
  ] = useState();

  // Modal visibilty
  const [modalVisibility, setModalVisibility] = useState(visible);
  // the current active tab in the modal
  const [currentActiveTab, setCurrentActiveTab] = useState('main_info');
  // To refresh the modal content
  const [showModalContent, setShowModalContent] = useState(false);

  // Current entity
  const [currentEntity, setCurrentEntity] = useState(entity);
  const [currentEntityInstance, setCurrentEntityInstance] = useState(record);

  // Previous entities stack
  const [prevEntitiesStack, setPrevEntitiesStack] = useState([]);
  const [prevEntitiesInstancesStack, setPrevEntitiesInstancesStack] = useState([]);

  const [relationshipActiveTab, setRelationshipActiveTab] = useState();
  const [form] = Form.useForm();

  const isUpdateAction = useMemo(() => (
    !!currentEntityInstance?.id && !prevEntitiesStack?.length
  ), [currentEntityInstance, currentEntity, prevEntitiesStack]);

  const currentEntityInputs = useMemo(() => (
    tableColumnsBuilder(currentEntity?.attributes || [])
  ), [visible, currentEntity]);

  useEffect(() => {
    setCurrentEntity(entity);
  }, [entity]);

  useEffect(() => {
    setCurrentEntityInstance(record);
  }, [record]);

  useEffect(() => {
    setCurrentEntity(entity);
    setModalVisibility(visible);
  }, [visible]);

  // to retrieve the EntityRelationshipId
  const EntityIdToEntityRelationshipId = useMemo(() => {
    const data = {};
    data.relationshipTos = currentEntity?.relationshipTos?.reduce((acc, ent) => (
      { ...acc, [ent.EntityId]: ent.id }), {});

    data.relationshipFroms = currentEntity?.relationshipFroms?.reduce((acc, ent) => (
      { ...acc, [ent.EntityId]: ent.id }), {});

    return data;
  }, [currentEntity]);

  const attributeNameToId = useMemo(() => {
    const temp = {};
    currentEntityInputs.forEach(item => {
      temp[item.title] = item.EntityAttributeId;
    });
    return temp;
  }, [currentEntityInputs]);

  const onCloseModal = () => {
    onClose();
    setTimeout(() => {
      setCurrentEntityInstance(undefined);
      setCurrentEntity(undefined);
      setRelationshipActiveTab();
    }, 200);
  };

  const onGoBackModal = useCallback(() => {
    if (prevEntitiesStack?.length) {
      setModalVisibility(false);
      setTimeout(() => {
        const tempPrevEntitiesStack = prevEntitiesStack;
        const tempPrevEntitiesInstancesStack = prevEntitiesInstancesStack;
        setCurrentEntity(tempPrevEntitiesStack.pop());
        setCurrentEntityInstance(tempPrevEntitiesInstancesStack.pop());
        setCurrentActiveTab('relationshipTos');
        // Remove the first element
        setPrevEntitiesStack(tempPrevEntitiesStack);
        setPrevEntitiesInstancesStack(tempPrevEntitiesInstancesStack);
        setModalVisibility(true);
      }, 100);

      // we switch to main_info then go back to relationshipTos, to reload the form component
      setTimeout(() => {
        setCurrentActiveTab('main_info');
      }, 200);

      setTimeout(() => {
        setCurrentActiveTab('relationshipTos');
      }, 300);
    } else {
      onCloseModal();
    }
  }, [prevEntitiesStack, prevEntitiesInstancesStack]);

  const onRelationshipsUpdate = useCallback((data, idKey) => {
    const current = currentEntityInstance || {};
    current[idKey] = data;
    setCurrentEntityInstance({ ...current });
  }, [currentEntityInstance]);

  const onCreate = useCallback((values) => {
    dispatch(
      createInstance(
        values,
        (instance) => {
          // if it was a relationship creation
          const stackLength = prevEntitiesInstancesStack?.length;
          if (stackLength) {
            const tempPrevEntitiesInstancesStack = prevEntitiesInstancesStack;
            const previous = tempPrevEntitiesInstancesStack[stackLength - 1];
            const uidRel = Date.now();
            previous.relationshipTos = [
              ...(previous?.relationshipTos || []),
              {
                instance,
                instanceId: instance?.instanceId,
                EntityId: instance?.EntityId,
                id: uidRel,
                key: `record_relationship_xxx_${uidRel}`,
              },
            ];
            tempPrevEntitiesInstancesStack[stackLength - 1] = previous;
            setPrevEntitiesInstancesStack(tempPrevEntitiesInstancesStack);
          } else {
            const EntityRelationship = entity?.relationshipFroms?.find(
              item => item.EntityId === instance?.EntityId,
            );
            onDone({
              ...instance,
              ParentInstanceId: currentEntity?.ParentInstanceId,
              ParentTemplateEntityId: currentEntity?.ParentTemplateEntityId,
              EntityRelationship,
            });
          }
          onGoBackModal();
        },
      ),
    );
  }, [currentEntity, prevEntitiesInstancesStack]);

  const onUpdate = useCallback((values) => {
    dispatch(
      updateInstance(
        currentEntityInstance?.instanceId,
        values,
        () => {
          onDone();
          onCloseModal();
        },
      ),
    );
  }, [currentEntityInstance]);

  const handleSubmit = useCallback((additionalRelationshipInfo) => {
    const temp = { attributes: {}, ...currentEntityInstance };
    // Format the dates
    Object.keys(temp.attributes).forEach(key => {
      if (moment.isMoment(temp.attributes[key])) {
        temp.attributes[key] = temp.attributes[key].format('YYYY-MM-DD');
      }
    });

    const formData = {
      EntityId: currentEntity?.id,
      Attributes: [],
    };

    formData.Relations = [];
    temp?.relationshipTos?.forEach((item) => {
      formData.Relations.push({
        id: item?.relationshipId,
        ToInstanceId: item?.instanceId,
        EntityRelationshipId:
        item?.EntityRelationshipId
        || EntityIdToEntityRelationshipId?.relationshipTos?.[item?.EntityId],
        Attributes: item?.AdditionalRelationshipInfo,
      });
    });

    temp?.relationshipFroms?.forEach((item) => {
      formData.Relations.push({
        id: item?.relationshipId,
        FromInstanceId: item?.instanceId,
        EntityRelationshipId:
        item?.EntityRelationshipId
        || EntityIdToEntityRelationshipId?.relationshipFroms?.[item?.EntityId],
        Attributes: item?.AdditionalRelationshipInfo,
      });
    });

    if (currentEntity.ParentInstanceId) {
      formData.Relations = [
        ...formData.Relations,
        {
          FromInstanceId: currentEntity?.ParentInstanceId,
          EntityRelationshipId: currentEntity?.EntityRelationship?.id,
          Attributes: additionalRelationshipInfo,
        },
      ];
    }

    Object.keys(temp.attributes).forEach(key => {
      if (attributeNameToId?.[key]) {
        formData.Attributes.push({
          EntityAttributeId: attributeNameToId[key],
          value: temp.attributes[key],
        });
      }
    });

    if (isUpdateAction) {
      onUpdate(formData);
    } else {
      onCreate(formData);
    }
  }, [currentEntity, currentEntityInstance]);

  const onFinish = useCallback(() => {
    form.validateFields()
      .then(() => {
        if (currentEntity?.ParentInstanceId
            && !!currentEntity?.EntityRelationship?.attributes?.length
        ) {
          setRelationshipAdditionalInformationData({
            instanceId: currentEntity?.ParentInstanceId,
            attributes: currentEntity?.EntityRelationship?.attributes,
            values: {},
          });
        } else {
          handleSubmit();
        }
      })
      .catch(() => {
        setCurrentActiveTab('main_info');
      });
  }, [currentEntity, currentEntityInstance]);

  const onFieldsChange = useCallback((changedFields, allFields) => {
    setCurrentEntityInstance((s) => (
      {
        ...s,
        attributes: allFields,
      }
    ));
    // To handle later : clear the error of the edited input only
    setTempInputErrors([]);
  }, [currentEntityInstance]);

  const refreshTheContent = () => {
    setShowModalContent(false);
    setTimeout(() => setShowModalContent(true), 0);
  };

  useEffect(() => {
    // to reset the current tabs
    if (!modalVisibility) {
      setCurrentActiveTab('main_info');
    } else {
      form.resetFields();
      refreshTheContent();
    }
  }, [modalVisibility]);

  useEffect(() => {
    setTempInputErrors(inputErrors);
  }, [inputErrors]);

  const formInputsGenerator = useCallback(() => (
    formInputsBuilder(currentEntityInputs, tempInputErrors)
  ), [t, tempInputErrors, currentEntityInputs]);

  const onCreateRelationship = useCallback((relationEntity, relationActiveTab) => {
    const tempPrevEntitiesStack = prevEntitiesStack;
    tempPrevEntitiesStack.push(currentEntity);
    setPrevEntitiesStack(tempPrevEntitiesStack);
    const tempPrevEntitiesInstancesStack = prevEntitiesInstancesStack;
    tempPrevEntitiesInstancesStack.push(currentEntityInstance);
    setPrevEntitiesInstancesStack(tempPrevEntitiesInstancesStack);

    setRelationshipActiveTab(relationActiveTab);
    setModalVisibility(false);
    setTimeout(() => {
      setCurrentEntityInstance(undefined);
      setCurrentEntity(relationEntity);
      setModalVisibility(true);
    }, 100);
  }, [prevEntitiesStack, prevEntitiesInstancesStack, currentEntity, currentEntityInstance]);

  return (
    <Modal
      title={
        isUpdateAction
          ? t('Instance:cta_edit', { entity: currentEntity?.name })
          : t('Instance:cta_new', { entity: currentEntity?.name })
      }
      visible={modalVisibility}
      onCancel={onCloseModal}
      maskClosable={false}
      width="80%"
      footer={[
        <Button
          type="default"
          onClick={onGoBackModal}
          key="cta_cancel"
        >{t('Global:cancel')}
        </Button>,
        <Button
          type="primary"
          onClick={onFinish}
          loading={isCreating || isUpdating}
          key="cta_submit"
        >
          {isUpdateAction
            ? t('Global:edit')
            : t('Global:add')}
        </Button>,
      ]}
    >
      {showModalContent && (
        <Tabs
          defaultActiveKey="main_info"
          activeKey={currentActiveTab}
          onChange={setCurrentActiveTab}
        >
          <TabPane tab={t('Instance:main_information')} key="main_info">
            <Row>
              <Col span={12} offset={6}>
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={currentEntityInstance?.attributes}
                  onValuesChange={onFieldsChange}
                >
                  { formInputsGenerator() }
                </Form>
              </Col>
            </Row>
          </TabPane>

          {!!currentEntity?.relationshipTos?.length && (
            <TabPane tab={t('Instance:relationships_to')} key="relationshipTos">
              <RelationshipsForm
                relationships={currentEntity?.relationshipTos}
                records={currentEntityInstance?.relationshipTos}
                onRelationshipsUpdate={(data) => {
                  onRelationshipsUpdate(data, 'relationshipTos');
                }}
                onCreateRelationship={onCreateRelationship}
                activeTab={relationshipActiveTab}
              />
            </TabPane>
          )}
          {/*
          {!!currentEntity?.relationshipFroms?.length && (
            <TabPane tab={t('Instance:relationships_from')} key="relationshipFroms" disabled>
              <RelationshipsForm
                relationships={currentEntity?.relationshipFroms}
                records={currentEntityInstance?.relationshipFroms}
                onRelationshipsUpdate={(data) => {
                  onRelationshipsUpdate(data, 'relationshipFroms');
                }}
                onCreateRelationship={onCreateRelationship}
                activeTab={relationshipActiveTab}
              />
            </TabPane>
          )}
          */}
          {record && (
            <TabPane
              tab={(
                <Typography.Text type="success">
                  <FileAddOutlined />
                  {t('Global:attached_files')}
                </Typography.Text>
              )}
              key="attachedFiles"
            >
              <AttachedFiles
                attachedFiles={record?.attachedFiles}
                id={{ InstanceId: record?.instanceId }}
                onListUpdated={onListFilesUpdated}
              />
            </TabPane>
          )}

        </Tabs>
      )}
      <RelationshipAdditionalInfoModal
        onClose={() => setRelationshipAdditionalInformationData()}
        data={relationshipAdditionalInformationData}
        onEditDone={(instanceId, values) => {
          setRelationshipAdditionalInformationData();
          handleSubmit(values);
        }}
      />
    </Modal>
  );
}

export default InstanceModal;
