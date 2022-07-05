import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: left;
`;

function AddRootInstancesButtons({ entity, onOpenSelectionInstance }) {
  const { t } = useTranslation(['Global']);
  const { entities } = useSelector(state => state.general);

  const childrenEntities = useMemo(() => (
    entities?.filter(item => entity?.Children?.includes(item.id))
  ), [entity, entities]);

  return (
    <Container>
      <Space>
        {!childrenEntities.length && (
          <Button
            type="primary"
            key={`cta_select_root_instance_${entity?.id}`}
            onClick={() => onOpenSelectionInstance(entity)}
          >
            { t('Global:select_x', { name: entity?.name }) } <PlusOutlined />
          </Button>
        )}
        {childrenEntities?.map(child => (
          <Button
            type="primary"
            key={`cta_select_root_instance_${child?.id}`}
            onClick={() => onOpenSelectionInstance(child)}
          >
            { t('Global:select_x', { name: child?.name }) } <PlusOutlined />
          </Button>
        ))}
      </Space>
    </Container>
  );
}

export default AddRootInstancesButtons;
