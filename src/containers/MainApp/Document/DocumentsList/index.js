import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import {
  PageHeader,
  Button,
  // Tag,
  Space,
  Popconfirm,
} from 'antd';
import { EditOutlined /* , DownOutlined, UpOutlined */ } from '@ant-design/icons';
import {
  fetchDocumentsList,
  deleteDocument,
  createDocument,
} from '~/containers/MainApp/Document/actions';

import { CTable } from '~/lab';
import Layout from '~/containers/Common/Layout/Layout';

const perPage = 10;

function DocumentsList(props) {
  const { t } = useTranslation(['Global', 'Document']);
  const dispatch = useDispatch();
  const history = useHistory();
  const { catId } = useParams();

  const {
    isFetching,
    list,
    total,
    isDeleting,
    isCreating,
  } = useSelector(state => state.document);

  // const [shownPartsID, setShownPartsID] = useState(undefined);
  const [recordInDeletion, setRecordInDeletion] = useState();
  const [listParams, setListParams] = useState();

  const fetchDocuments = useCallback(() => {
    dispatch(fetchDocumentsList(listParams));
  }, [dispatch, listParams]);

  useEffect(() => {
    setListParams({
      page: 1,
      perPage,
      CategoryId: catId,
      search: '',
    });
  }, [catId]);

  useEffect(() => {
    if (listParams) {
      fetchDocuments();
    }
  }, [listParams]);

  const onCreateDocument = () => {
    dispatch(createDocument(
      { CategoryId: catId },
      (document) => {
        setTimeout(() => {
          window.location.href = `/document/edit/${document.id}`;
          // history.push(`/document/edit/${document.id}`);
        }, 500);
      },
    ));
  };

  const onSearch = (term) => {
    setListParams({
      ...listParams,
      page: 1,
      search: term,
    });
  };

  const onDeleteDocument = (id) => {
    setRecordInDeletion(id);
    dispatch(
      deleteDocument(
        id,
        () => {
          fetchDocuments();
          setRecordInDeletion();
        },
        () => setRecordInDeletion(),
      ),
    );
  };

  /*
  const handleShowPartsButton = (docId) => {
    setShownPartsID(shownPartsID === docId ? undefined : docId);
  };
  */

  const columns = useMemo(() => [
    {
      key: 'show_parts',
      width: 150,
      render: (record) => {
        const { id: docId /* , persons */ } = record;
        return (
          <Space>
            {/* !!persons?.length && (
              <Tag
                color="orange"
                icon={
                  shownPartsID === docId
                    ? <UpOutlined />
                    : <DownOutlined />
                }
                style={{ cursor: 'pointer' }}
                onClick={() => handleShowPartsButton(docId)}
              >
                {
                  shownPartsID === docId
                    ? t('Document:hide_parts')
                    : t('Document:show_parts')
                }
              </Tag>
            ) */}

            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                // history.push(`/document/edit/${docId}`);
                window.location.href = `/document/edit/${docId}`;
              }}
            >
              { t('Document:revision') }
            </Button>
            <Popconfirm
              title={t('Global:are_you_sure')}
              onConfirm={() => onDeleteDocument(docId)}
              okText={t('Global:yes')}
              cancelText={t('Global:no')}
            >
              <Button
                type="primary"
                size="small"
                danger
                loading={docId === recordInDeletion ? isDeleting : false}
              >{t('Global:delete')}
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
    {
      title: t('Document:reference'),
      dataIndex: 'reference',
      key: 'reference',
      width: '150px',
    },
    {
      title: t('Global:created_at'),
      dataIndex: 'date',
      key: 'date',
      width: '150px',
      render: (value) => moment(value).format('YYYY/MM/DD'),
    },
    /*
    {
      key: 'parts',
      render: (record) => {
        const { id: docId, persons } = record;
        if (shownPartsID !== docId) {
          return null;
        }
        return (
          <CTable
            columns={[
              {
                title: t('Global:firstName'),
                dataIndex: 'firstName',
                key: 'firstName',
              },
              {
                title: t('Global:lastName'),
                dataIndex: 'lastName',
                key: 'lastName',
              },
              {
                title: `${t('Document:client')} / ${t('Document:agent')}`,
                dataIndex: 'procuration_type',
                key: 'procuration_type',
              },
            ]}
            size="small"
            dataSource={persons?.map(person => ({
              ...person?.client,
              procuration_type: person.templateName,
            }))}
            pagination={false}
            bordered
          />
        );
      },
    },
    */
  ], [t /* , shownPartsID */, recordInDeletion, isDeleting, listParams]);

  useEffect(() => {
    if (
      !list.length
      && total > 0
      && !listParams.page === 0
    ) {
      setListParams({
        ...listParams,
        page: listParams.page - 1,
      });
    }
  }, [list]);

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          onBack={history.goBack}
          title={t('Document:documents_list')}
          // subTitle="List of documents of a category X"
          extra={[
            <Button
              type="primary"
              onClick={onCreateDocument}
              loading={isCreating}
              key="cta_new_document"
            >
              { t('Global:new_document') }
            </Button>,
          ]}
        />
      )}
    >
      <CTable
        columns={columns}
        dataSource={list}
        loading={isFetching}
        withSearch
        onSearch={onSearch}
        pagination={
          {
            pageSize: perPage,
            onChange: (page) => {
              setListParams({
                ...listParams,
                page,
              });
            },
            total,
          }
        }
      />
    </Layout>
  );
}

export default DocumentsList;
