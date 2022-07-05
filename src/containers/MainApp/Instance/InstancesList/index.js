import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from 'antd';
import InstancesList from './components/InstancesList';
import Layout from '~/containers/Common/Layout/Layout';

function InstancesListPage(props) {
  const { entityName, entityId } = useParams();

  const { t } = useTranslation(['Instance']);
  const history = useHistory();

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          onBack={history.goBack}
          title={t('Instance:list_title', { entity: entityName })}
        />
      )}
    >
      <InstancesList
        entityId={entityId}
        entityName={entityName}
      />
    </Layout>
  );
}

export default InstancesListPage;
