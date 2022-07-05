import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '~/containers/Common/User/actions';
import { Logo } from '~/lab';
import { HeaderContainer, HeaderBloc } from './components';
import { employeesTypesColors } from '~/config';

const { SubMenu } = Menu;

const HeaderComponent = () => {
  const { t } = useTranslation(['Document', 'Global']);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLogged } = useSelector(state => state.user.auth);
  const { data: myProfile } = useSelector(state => state.user.userInfo);

  const goLogout = () => {
    dispatch(logout());
  };
  const userType = useMemo(() => myProfile?.type?.toLowerCase(), [myProfile?.type]);
  return (
    <HeaderContainer>
      <HeaderBloc>
        <Link to="/">
          <Logo />
        </Link>
      </HeaderBloc>

      <HeaderBloc>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname?.split('/')?.[1]]}>
          { isLogged && (
            <>
              <Menu.Item key="dashboard">
                <Link to="/dashboard">{t('Global:dashboard')}</Link>
              </Menu.Item>
              <SubMenu
                key="SubMenu"
                icon={<UserOutlined />}
                title={(
                  <>
                    <Tag color={employeesTypesColors[userType]}>{t(`Global:${userType}`)}</Tag>
                    <span>{myProfile?.name}</span>
                  </>
                )}
              >
                {myProfile?.type === 'ADMIN' && (
                  <Menu.Item key="/profile">
                    <Link to="/profile">{t('Global:my_profile')}</Link>
                  </Menu.Item>
                )}
                <Menu.Item key="logout" onClick={goLogout}>{t('Global:logout')}</Menu.Item>
              </SubMenu>
            </>
          )}
          { !isLogged && (
            <Menu.Item key="/signin">
              <Link to="/signin">{t('Global:signin')}</Link>
            </Menu.Item>
          )}
        </Menu>
      </HeaderBloc>
    </HeaderContainer>
  );
};

export default HeaderComponent;
