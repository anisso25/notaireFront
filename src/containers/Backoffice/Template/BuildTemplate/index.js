import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader, Button, Switch } from 'antd';
import TemplateEditor from './components/TemplateEditor/TemplateEditor';
import Layout from '~/containers/Common/Layout/Layout';
import NewResourceModal from './components/NewResourceModal/NewResourceModal';

function BuildTemplatePage(props) {
  const { t } = useTranslation(['AppManagement', 'Document']);
  const history = useHistory();
  const [showNewResourceModal, setShowNewResourceModal] = useState(false);

  const [showTemplateViewer, setShowTemplateViewer] = useState();

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          onBack={history.goBack}
          title={t('AppManagement:template.cta_new')}
          extra={[
            <>
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                onChange={setShowTemplateViewer}
              />
              <span>{t('Document:template_viewer')}</span>
            </>,
            <Button
              type="primary"
              onClick={() => setShowNewResourceModal(true)}
            >
              { t('AppManagement:template.new_resource') }
            </Button>,
          ]}
        />
      )}
    >
      <TemplateEditor
        showDocumentViewer={showTemplateViewer}
        documentViewerTitle={t('Document:template_viewer')}
      />
      <NewResourceModal
        visible={showNewResourceModal}
        onClose={() => setShowNewResourceModal(false)}
      />
    </Layout>
  );
}

export default BuildTemplatePage;
