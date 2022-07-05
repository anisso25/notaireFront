import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch /* , useSelector */ } from 'react-redux';
import styled from 'styled-components';

import {
  Table,
  Space,
  Tooltip,
  Button,
  Popconfirm,
} from 'antd';
import {
  DownloadOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';

import {
  deleteAttachedFile,
  getAttachedFile,
  // updateAttachedFile,
} from '~/containers/MainApp/Document/actions';
import Preview from './Preview';

const SmallButton = styled(Button)`
  font-size: 0.9rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .anticon {
    font-size: 14px;
    line-height: 0.8;
  }
`;

function FilesList({
  attachedFiles,
  onEditFile,
  onFileDeleted,
  canEditFiles,
}) {
  const { t } = useTranslation(['Global']);
  const [files, setFiles] = useState(attachedFiles);
  const [previewFile, setPreviewFile] = useState();

  const [filesBeingDeleted, setFilesBeingDeleted] = useState([]);
  const [filesBeingDownloaded, setFilesBeingDownloaded] = useState([]);

  const dispatch = useDispatch();

  const onDelete = (filename) => {
    setFilesBeingDeleted(s => [...s, filename]);
    dispatch(deleteAttachedFile(
      filename,
      () => {
        onFileDeleted(filename);
        setFilesBeingDeleted(s => s?.filter(f => f !== filename));
      },
    ));
  };

  const onGetFile = (filename) => {
    setFilesBeingDownloaded(s => [...s, filename]);
    dispatch(getAttachedFile(
      filename,
      (file) => {
        setPreviewFile(file);
        setFilesBeingDownloaded(s => s?.filter(f => f !== filename));
      },
    ));
  };

  const onClickEditFile = (record) => {
    onEditFile(record);
    setFiles(f => f?.map(item => (
      {
        ...item,
        beingEdited: item?.filename === record?.filename,
      }
    )));
  };

  const columns = useMemo(() => (
    [
      {
        title: t('Global:filename'),
        type: 'text',
        dataIndex: 'title',
        key: 'title',
      },
      {
        type: 'file',
        dataIndex: 'filename',
        key: 'filename',
        width: 100,
        render: (filename, record) => (
          <Space>
            {
              // eslint-disable-next-line react/destructuring-assignment
              !filename.match(/.(jpg|jpeg|png|gif)$/i) ? (
                <Tooltip title={t('Global:download')}>
                  <SmallButton
                    type="primary"
                    size="small"
                    shape="circle"
                    icon={<DownloadOutlined size="small" />}
                    onClick={() => onGetFile(filename)}
                    loading={filesBeingDownloaded?.includes(filename)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title={t('Global:preview')}>
                  <SmallButton
                    type="primary"
                    size="small"
                    shape="circle"
                    icon={<EyeOutlined size="small" />}
                    onClick={() => onGetFile(filename)}
                    loading={filesBeingDownloaded?.includes(filename)}
                  />
                </Tooltip>
              )
            }
            {canEditFiles && (
              <Tooltip title={t('Global:edit')}>
                <SmallButton
                  type="primary"
                  size="small"
                  shape="circle"
                  icon={<EditOutlined />}
                  disabled={record?.beingEdited}
                  onClick={() => onClickEditFile(record)}
                />
              </Tooltip>
            )}
            <Popconfirm
              title={t('Global:are_you_sure')}
              onConfirm={() => onDelete(filename)}
              okText={t('Global:yes')}
              cancelText={t('Global:no')}
            >
              <Tooltip title={t('Global:delete')}>
                <SmallButton
                  type="danger"
                  size="small"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  loading={filesBeingDeleted?.includes(filename)}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        ),
      },
    ]
  ), [t, filesBeingDownloaded, filesBeingDeleted]);

  useEffect(() => {
    setFiles(attachedFiles);
  }, [attachedFiles]);

  return (
    <>
      <Table
        size="small"
        columns={columns}
        dataSource={files}
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 5,
        }}
      />
      <Preview
        image={previewFile}
        onClose={() => setPreviewFile(undefined)}
      />
    </>
  );
}

export default FilesList;
