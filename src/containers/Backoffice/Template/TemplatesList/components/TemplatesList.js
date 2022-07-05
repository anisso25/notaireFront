import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Space,
  Popconfirm,
  Tooltip,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  fetchTemplatesList,
  deleteTemplate,
} from '~/containers/Backoffice/Template/actions';
import { CTable } from '~/lab';
import templateColumns from '~/containers/Backoffice/Template/columns';

const perPage = 10;

function TemplatesList({
  data,
  showNewTemplateButton = true,
  withSearch = true,
  withPagination = true,
}) {
  const { t } = useTranslation(['AppManagement', 'Global']);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isFetching,
    list,
    total,
    isDeleting,
  } = useSelector(state => state.template);

  const [templatesList, setTemplatesList] = useState(list || []);
  const [recordInDeletion, setRecordInDeletion] = useState();

  const [listParams, setListParams] = useState({
    page: 1,
    perPage,
    search: '',
  });

  const fetchTemplates = useCallback(() => {
    dispatch(fetchTemplatesList(listParams));
  }, [dispatch, listParams]);

  const onUpdateTemplate = (record) => {
    history.push(`/management/template/edit/${record.id}`);
  };

  const onNewTemplate = () => {
    history.push('/management/template/new');
  };

  const onSearch = (term) => {
    setListParams({
      ...listParams,
      page: 1,
      search: term,
    });
  };

  const actionsColumn = useMemo(() => {
    const onDelete = (id) => {
      setRecordInDeletion(id);
      dispatch(
        deleteTemplate(
          id,
          () => {
            fetchTemplates();
            setRecordInDeletion();
          },
          () => setRecordInDeletion(),
        ),
      );
    };

    return [
      {
        width: '120px',
        render: (record) => {
          const { id } = record;
          return (
            <Space>
              <Tooltip title={t('Global:edit')}>
                <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => onUpdateTemplate(record)}
                />
              </Tooltip>
              <Popconfirm
                title={t('Global:are_you_sure')}
                onConfirm={() => onDelete(id)}
                okText={t('Global:yes')}
                cancelText={t('Global:no')}
                disabled
              >
                <Tooltip title={t('Global:delete')}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                    loading={id === recordInDeletion ? isDeleting : false}
                    disabled
                  />
                </Tooltip>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, [dispatch, fetchTemplates, isDeleting, recordInDeletion, t]);

  const templatesListColumns = useMemo(() => (
    templateColumns(t).concat(actionsColumn)
  ), [t, actionsColumn]);

  useEffect(() => {
    fetchTemplates();
  }, [listParams]);

  useEffect(() => {
    setTemplatesList(list);
  }, [list]);

  return (
    <>
      <CTable
        columns={templatesListColumns}
        dataSource={data || templatesList}
        loading={isFetching}
        withSearch={withSearch}
        onSearch={onSearch}
        extraButton={(
          showNewTemplateButton && (
            <Button
              type="primary"
              onClick={onNewTemplate}
            >
              { t('AppManagement:template.cta_new') }
            </Button>
          )
        )}
        pagination={
          withPagination && ({
            pageSize: perPage,
            onChange: (page) => {
              setListParams({
                ...listParams,
                page,
              });
            },
            total,
          })
        }
      />
    </>
  );
}

export default TemplatesList;
