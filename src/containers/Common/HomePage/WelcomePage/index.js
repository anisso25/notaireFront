import React, { useEffect } from 'react';
import { useSelector /* , useDispatch */ } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import Layout from '~/containers/Common/Layout/Layout';

// import { fetchGeneralData } from '~/containers/Common/HomePage/actions';

function WelcomePage(props) {
  const { t } = useTranslation('Global');
  // const dispatch = useDispatch();
  const { data: myProfile } = useSelector(state => state.user.userInfo);

  useEffect(() => {
    // dispatch(fetchGeneralData());
  }, []);

  return (
    <Layout {...props} hideSidebar>
      <Result
        icon={<SmileOutlined />}
        title={t('Global:welcome_msg', { name: myProfile?.name })}
      />
    </Layout>
  );
}

export default WelcomePage;
