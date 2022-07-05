import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Button, Result } from 'antd';
import Layout from '~/containers/Common/Layout/Layout';

function Error404(props) {
  const { t } = useTranslation(['Error', 'Global']);
  const history = useHistory();

  return (
    <Layout {...props}>
      <Result
        status="404"
        title="404"
        subTitle={t('Error:error404')}
        extra={(
          <Button
            type="primary"
            onClick={() => history.push('/')}
          >{ t('Global:back_home') }
          </Button>
        )}
      />
    </Layout>
  );
}

export default Error404;
