import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from 'antd';
import TemplatesList from './components/TemplatesList';
import Layout from '~/containers/Common/Layout/Layout';

function TemplatesListPage(props) {
  const { t } = useTranslation(['AppManagement']);
  const history = useHistory();

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          onBack={history.goBack}
          title={t('AppManagement:template.list_title')}
        />
      )}
    >
      <TemplatesList />
    </Layout>
  );
}

export default TemplatesListPage;
