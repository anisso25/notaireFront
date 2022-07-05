import React, { useCallback } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { List, Typography } from 'antd';

export const TheList = styled(List)`
  font-size: 14px;
  .ant-list-item {
    padding: 5px 0;
    &:first-child {
      padding-top: 0 !important;
    }
    &:last-child {
      padding-bottom: 0;
    }
  }
`;

function AdditionalRelationshipInfoModal({ data }) {
  const renderInfo = useCallback(
    (value) => {
      if (
        moment(value, 'YYYY-MM-DD', true).isValid()
        || moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()
      ) {
        return moment(value).format('YYYY/MM/DD');
      }
      return value;
    },
    [data],
  );

  return (
    <TheList
      dataSource={Object.entries(data || {})}
      renderItem={item => (
        <List.Item>
          <Typography.Text strong>{item?.[0]} :</Typography.Text> <Typography.Text type="success">{renderInfo(item?.[1])}</Typography.Text>
        </List.Item>
      )}
    />
  );
}

export default AdditionalRelationshipInfoModal;
