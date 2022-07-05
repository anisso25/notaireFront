import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import DocType from './components';

const Container = styled(Row)`
  padding: 48px 24px;
`;

const DocumentTypeSelectorComponent = () => {
  const { categories } = useSelector(state => state.general);
  return (
    <Container gutter={[72, 72]} justify="center">
      {categories?.map(category => (
        <DocType
          id={category?.id}
          name={category?.name}
          icon={category?.icon}
          key={category?.id}
        />
      ))}
    </Container>
  );
};

export default DocumentTypeSelectorComponent;
