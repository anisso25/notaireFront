import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from 'antd';
import EmployeesList from './components/EmployeesList';
import Layout from '~/containers/Common/Layout/Layout';

function EmployeesListPage(props) {
  const { t } = useTranslation(['Employee']);
  const history = useHistory();

  return (
    <Layout
      {...props}
      PageHeader={(
        <PageHeader
          onBack={history.goBack}
          title={t('Employee:list_title')}
        />
      )}
    >
      <EmployeesList />
    </Layout>
  );
}

export default EmployeesListPage;
