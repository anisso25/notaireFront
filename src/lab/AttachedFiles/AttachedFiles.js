import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Card } from 'antd';
import FilesList from './FilesList/FilesList';
// eslint-disable-next-line import/no-cycle
import UploadForm from './UploadForm';
import EditForm from './EditForm';

function AttachedFiles({
  attachedFiles,
  id,
  canEditFiles = true,
  onListUpdated = () => {},
}) {
  const { t } = useTranslation(['Global']);

  const [files, setFiles] = useState(attachedFiles || []);
  const [fileToEdit, setFileToEdit] = useState();

  const onFileUpdated = (file) => {
    setFiles(s => s?.map(
      f => (f?.filename === file?.filename ? file : f),
    ));
  };
  const onFileUploaded = (file) => {
    setFiles(s => [...s, file]);
  };

  const onFileDeleted = (filename) => {
    setFiles(s => s?.filter(f => f?.filename !== filename));
  };

  const onCancelEdit = () => {
    setFileToEdit();
    setFiles(s => s?.map(item => ({ ...item, beingEdited: false })));
  };

  useEffect(() => {
    onListUpdated(id, files);
  }, [files]);

  return (
    <Row gutter={24}>
      <Col span={canEditFiles ? 12 : 24}>
        <FilesList
          attachedFiles={files}
          onEditFile={setFileToEdit}
          onFileDeleted={onFileDeleted}
          canEditFiles={canEditFiles}
        />
      </Col>
      {canEditFiles && (
        <Col span={12}>
          <Card
            type="inner"
            title={fileToEdit ? t('Global:edit_file_title') : t('Global:attach_file')}
            size="small"
          >
            {fileToEdit ? (
              <EditForm
                record={fileToEdit}
                onFileUpdated={onFileUpdated}
                onCancel={onCancelEdit}
              />
            ) : (
              <UploadForm
                id={id}
                onFileUploaded={onFileUploaded}
              />
            )}
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default AttachedFiles;
