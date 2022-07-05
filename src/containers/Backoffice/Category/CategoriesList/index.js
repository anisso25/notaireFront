import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from 'antd';
import CategoriesList from './components/CategoriesList';
import Layout from '~/containers/Common/Layout/Layout';

function CategoriesListPage(props) {
  const { t } = useTranslation(['AppManagement']);
  const history = useHistory();

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          onBack={history.goBack}
          title={t('AppManagement:category.list_title')}
        />
      )}
    >
      <CategoriesList />
    </Layout>
  );
}

export default CategoriesListPage;
