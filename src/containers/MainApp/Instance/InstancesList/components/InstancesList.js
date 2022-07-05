import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  Button,
  Space,
  Popconfirm,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import {
  fetchInstancesList,
  deleteInstance,
} from '~/containers/MainApp/Instance/actions';
import { CTable } from '~/lab';
import tableColumnsBuilder from '~/utils/tableColumnsBuilder';
import InstanceModal from '~/containers/MainApp/Instance/InstanceModal';
import { getEntitiesByID } from '~/containers/Common/HomePage/Selectors';

const perPage = 10;

function InstancesList({
  entityId,
  entityName,
}) {
  const { t } = useTranslation(['Instance', 'Global']);
  const dispatch = useDispatch();
  const {
    isFetching,
    list,
    isDeleting,
  } = useSelector(state => state.instance);
  const entities = useSelector(getEntitiesByID);
  const [instancesList, setInstancesList] = useState([]);
  const [showInstanceEditionModal, setShowInstanceEditionModal] = useState(false);
  const [recordInDeletion, setRecordInDeletion] = useState();
  const [instanceToUpdate, setInstanceToUpdate] = useState();

  const [listParams, setListParams] = useState();

  const [searchParams, setSearchParams] = useState();

  const entity = useMemo(() => entities?.[entityId] || {}, [entities, entityId]);

  useEffect(() => {
    setListParams({
      page: 1,
      perPage,
      EntityId: entityId,
    });
  }, [entityId]);

  const fetchInstances = useCallback(() => {
    dispatch(fetchInstancesList({
      ...listParams,
      ...(searchParams || {}),
    }));
  }, [listParams, searchParams]);

  useEffect(() => {
    if (listParams) {
      fetchInstances();
    }
  }, [listParams, searchParams]);

  const onUpdateInstance = (record) => {
    const data = { ...record };

    const attributes = {};
    Object.keys(data?.attributes).forEach(key => {
      if (
        moment(data?.attributes[key], 'YYYY-MM-DD', true).isValid()
        || moment(data?.attributes[key], 'YYYY-MM-DD HH:mm:ss', true).isValid()
      ) {
        attributes[key] = moment(data?.attributes[key]);
      } else if (
        // For handling enums
        typeof data?.attributes[key] === 'object'
        && key !== 'relationshipFroms'
        && key !== 'relationshipTos'
        && key !== 'attachedFiles') {
        attributes[key] = data?.attributes[key]?.id;
      } else {
        attributes[key] = data?.attributes[key];
      }
    });
    setInstanceToUpdate({
      ...data,
      attributes,
    });
    setShowInstanceEditionModal(true);
  };

  const onNewInstance = () => {
    setInstanceToUpdate();
    setShowInstanceEditionModal(true);
  };

  const onCloseInstanceModal = () => {
    setInstanceToUpdate();
    setShowInstanceEditionModal(false);
  };

  const onSearch = (params) => {
    setListParams({
      ...listParams,
      page: 1,
    });
    setSearchParams(params);
  };

  const onInstanceModalActionDone = () => {
    // Update case
    if (instanceToUpdate) {
      setInstanceToUpdate();
      fetchInstances();
    } else {
      setListParams({
        ...listParams,
        page: 1,
      });
    }
  };

  const actionsColumn = useMemo(() => {
    const onDelete = (id) => {
      setRecordInDeletion(id);
      dispatch(
        deleteInstance(
          {
            id,
          },
          () => {
            fetchInstances();
            setRecordInDeletion();
          },
          () => setRecordInDeletion(),
        ),
      );
    };

    return [
      {
        width: 120,
        render: (data) => {
          const { record } = data;
          return (
            <Space>
              <Tooltip title={t('Global:edit')} key={`cta_edit_${record?.instanceId}`}>
                <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => onUpdateInstance(record)}
                />
              </Tooltip>

              <Popconfirm
                title={t('Global:are_you_sure')}
                onConfirm={() => onDelete(record?.instanceId)}
                okText={t('Global:yes')}
                cancelText={t('Global:no')}
                key={`cta_delete_${record?.instanceId}`}
              >
                <Tooltip title={t('Global:delete')}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                    loading={record?.id === recordInDeletion ? isDeleting : false}
                  />
                </Tooltip>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, [dispatch, fetchInstances, isDeleting, listParams, recordInDeletion, t]);

  const instanceListColumns = useMemo(() => (
    tableColumnsBuilder(entity?.attributes)?.concat(actionsColumn)
  ), [entity, actionsColumn]);

  useEffect(() => {
    if (
      !list?.data?.length
      && list?.total > 0
      && !listParams.page === 0
    ) {
      setListParams({
        ...listParams,
        page: listParams.page - 1,
      });
    } else {
      setInstancesList(
        list?.data?.map(item => ({
          ...item?.attributes,
          uid: item?.uid,
          key: item?.key,
          record: item,
        })) || [],
      );
    }
  }, [list]);

  const onListFilesUpdated = useCallback((id, files) => {
    const temp = instancesList?.map(inst => {
      if (inst?.record?.instanceId === id?.InstanceId) {
        return {
          ...inst,
          record: {
            ...inst?.record,
            attachedFiles: files,
          },
        };
      }
      return inst;
    });
    setInstancesList([...temp]);
  }, [instancesList]);

  return (
    <>
      <CTable
        columns={instanceListColumns}
        dataSource={instancesList}
        loading={isFetching}
        withSearch
        withAdvancedSearch
        onSearch={onSearch}
        extraButton={(
          <Button
            type="primary"
            onClick={onNewInstance}
          >
            { t('Instance:cta_new', { entity: entityName }) }
          </Button>
        )}
        pagination={
          {
            pageSize: perPage,
            onChange: (page) => {
              setListParams({
                ...listParams,
                page,
              });
            },
            total: list?.total,
          }
        }
      />

      <InstanceModal
        visible={showInstanceEditionModal}
        onClose={onCloseInstanceModal}
        record={instanceToUpdate}
        onDone={onInstanceModalActionDone}
        entity={entity}
        onListFilesUpdated={onListFilesUpdated}
      />

    </>
  );
}

export default InstancesList;
