import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Tooltip,
  Divider,
  Space,
} from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { autocompleteInstancesList } from '~/containers/MainApp/Instance/actions';
import { CTable } from '~/lab';
import tableColumnsBuilder from '~/utils/tableColumnsBuilder';

const perPage = 10;

function SelectableList({
  data,
  entity,
  relationship,
  withPagination = true,
  onRelationshipsUpdate = () => {},
  onSelectionUpdate = undefined,
  disableSelectionButtons,
  showSelectedDataOnly,
  displayMessage,
  additionalActions = undefined,
  additionalSearchParams = {},
  hideSelectedData,
  onCreateInstance,
  onOpenEditAdditionalRelationshipInfo = () => {},
}) {
  const { t } = useTranslation(['Instance', 'Global']);
  const dispatch = useDispatch();
  const { isAutoCompleting } = useSelector(state => state.instance);
  const [instancesList, setInstancesList] = useState({
    list: [],
    total: 0,
  });

  const [displayedInstancesList, setDisplayedInstancesList] = useState({
    list: [],
    total: 0,
  });
  const [selectedRecords, setSelectedRecords] = useState(data || []);
  const [listParams, setListParams] = useState();
  const [searchParams, setSearchParams] = useState();

  useEffect(() => {
    setListParams({
      page: 1,
      perPage,
      EntityId: entity?.id,
    });
  }, [entity]);

  // Refactor this later
  // To update the list on the document details page
  useEffect(() => {
    if (onSelectionUpdate) {
      setSelectedRecords(data || []);
    }
  }, [data]);

  const isSearching = useMemo(() => (
    (
      searchParams?.['search[0][value]']
      && searchParams?.['search[0][value]']?.length >= 3
    )
    || Object.keys(searchParams || {})
      .filter(key => key !== 'search[0][value]' && key.startsWith('search[')).length > 0
  ), [searchParams]);

  const fetchInstances = useCallback(() => {
    if (
      !listParams
      || (!isSearching && !additionalSearchParams?.ParentInstanceId)
    ) {
      return;
    }

    setDisplayedInstancesList({
      list: [],
      total: 0,
    });

    dispatch(
      autocompleteInstancesList({
        ...listParams,
        ...(searchParams || {}),
        ...(additionalSearchParams || {}),
      },
      (instancesData) => {
        setInstancesList({
          list: instancesData?.list,
          total: instancesData?.total,
        });
      }),
    );
  }, [listParams, searchParams]);

  useEffect(() => {
    setDisplayedInstancesList({
      list: instancesList?.list,
      total: instancesList?.total,
    });
  }, [selectedRecords, instancesList]);

  const onSearch = useCallback((params) => {
    if (params && params.length === 0 && !additionalSearchParams?.ParentInstanceId) {
      return;
    }
    setListParams({
      ...listParams,
      page: 1,
    });
    setSearchParams(params);
  }, [listParams, additionalSearchParams]);

  const onSelect = useCallback((record) => {
    if (onSelectionUpdate) {
      // If it is selected for a document
      onSelectionUpdate('select', record);
    } else {
      setSelectedRecords([...selectedRecords, record]);
      onOpenEditAdditionalRelationshipInfo(record?.id, record?.instanceId);
    }
  }, [selectedRecords, onOpenEditAdditionalRelationshipInfo]);

  const onUnselect = useCallback((record) => {
    if (onSelectionUpdate) {
      // If it is selected for a document
      onSelectionUpdate('unselect', record);
    } else {
      setSelectedRecords(selectedRecords?.filter(item => item.id !== record?.id));
    }
  }, [selectedRecords]);

  useEffect(() => {
    onRelationshipsUpdate(selectedRecords);
  }, [selectedRecords]);

  const selectionButton = useMemo(() => (
    [
      {
        width: 120,
        render: (record) => (
          <Tooltip title={t('Global:select')}>
            <Button
              size="small"
              icon={<PlusOutlined />}
              disabled={disableSelectionButtons}
              onClick={() => onSelect(record)}
            />
          </Tooltip>
        ),
      },
    ]
  ), [disableSelectionButtons, selectedRecords]);

  const unSelectionButton = useMemo(() => (
    [
      {
        width: 90,
        render: (record) => (
          <Space>
            <Tooltip title={t('Global:unselect')}>
              <Button
                size="small"
                icon={<MinusOutlined />}
                onClick={() => onUnselect(record)}
              />
            </Tooltip>
            {typeof additionalActions === 'function' && additionalActions(record)}
          </Space>
        ),
      },
    ]
  ), [disableSelectionButtons, selectedRecords, additionalActions]);

  const entityAttributesColumns = useMemo(() => (
    tableColumnsBuilder(entity?.attributes) || []
  ), [entity]);

  useEffect(() => {
    setListParams({
      page: 1,
      perPage,
      EntityId: entity?.id,
      // 'search[0][value]': '',
    });
  }, [entity]);

  useEffect(() => {
    fetchInstances();
  }, [listParams, searchParams]);

  return (
    <>
      {!showSelectedDataOnly && (
        <CTable
          size="small"
          columns={entityAttributesColumns.concat(showSelectedDataOnly ? [] : selectionButton)}
          dataSource={displayedInstancesList?.list?.map(item => ({ ...item, ...item?.attributes }))}
          loading={isAutoCompleting}
          withSearch
          withAdvancedSearch
          onSearch={onSearch}
          hideTable={
            !displayedInstancesList?.list?.length
            || (!isSearching && !additionalSearchParams?.ParentInstanceId)
          }
          // (!listParams?.['search[0][value]'] && !additionalSearchParams?.ParentInstanceId)
          extraButton={
            onCreateInstance && (
            <Button
              type="default"
              onClick={onCreateInstance}
              icon={<PlusOutlined />}
            >
              { t('Instance:cta_new', { entity: relationship?.name || entity?.name }) }
            </Button>
            )
          }
          pagination={
            withPagination && ({
              pageSize: perPage,
              onChange: (page) => {
                setListParams({
                  ...listParams,
                  page,
                });
              },
              total: !displayedInstancesList?.total,
            })
          }
        />
      )}

      {!hideSelectedData && (
        <>
          {displayMessage && (
            <>
              <Divider />
              {displayMessage}
            </>
          )}
          <Divider />

          <CTable
            columns={entityAttributesColumns.concat(showSelectedDataOnly ? [] : unSelectionButton)}
            dataSource={data}
            withSearch={false}
          />
        </>
      )}
    </>
  );
}

export default SelectableList;
