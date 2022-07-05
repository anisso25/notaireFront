import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Layout, Menu } from 'antd';
import { BlockOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarComponent = () => {
  const { t } = useTranslation(['Global', 'Document']);
  const location = useLocation();
  const { data: myProfile } = useSelector(state => state.user.userInfo);
  const { categories, entities } = useSelector(state => state.general);

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultOpenKeys={[
          'documents_list',
          'resources_management',
          'office_management',
          'app_management',
        ]}
        selectedKeys={[location.pathname]}
        style={{ height: '100%' }}
        theme="dark"
      >
        {['EMPLOYEE', 'ADMIN'].includes(myProfile?.type) && (
          <SubMenu key="documents_list" icon={<BlockOutlined />} title={t('Document:documents_list')}>
            {categories.map(item => (
              <Menu.Item key={`/document/${item.id}`}>
                <Link to={`/document/${item.id}`}>{item.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        )}

        {['EMPLOYEE', 'ADMIN'].includes(myProfile?.type) && (
          <SubMenu key="resources_management" icon={<BlockOutlined />} title={t('Global:resources_management')}>
            {entities.filter(item => !item.isAbstract).map(item => (
              <Menu.Item key={`/management/instance/${item.id}/${item.name}`}>
                <Link to={`/management/instance/${item.id}/${item.name}`}>{item.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        )}

        {['ADMIN'].includes(myProfile?.type) && (
          <SubMenu key="office_management" icon={<HomeOutlined />} title={t('Global:office_management')}>
            <Menu.Item key="/management/office-infos">
              <Link to="/management/office-infos">{t('Global:office_info')}</Link>
            </Menu.Item>
            <Menu.Item key="/management/employee">
              <Link to="/management/employee">{t('Global:employees_management')}</Link>
            </Menu.Item>
          </SubMenu>
        )}

        {['SUPER_ADMIN'].includes(myProfile?.type) && (
          <SubMenu key="app_management" icon={<ToolOutlined />} title={t('Global:app_management')}>
            <Menu.Item key="/management/category">
              <Link to="/management/category">{t('Global:categories_management')}</Link>
            </Menu.Item>
            <Menu.Item key="/management/template">
              <Link to="/management/template">{t('Global:templates_management')}</Link>
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </Sider>
  );
};
export default SidebarComponent;
