import styled from 'styled-components';
import {
  Input,
  Card,
  Button,
  Collapse,
} from 'antd';

const { Panel } = Collapse;

export const TableContainer = styled.div`
  .ant-table-row-expand-icon-cell {
    padding: 0;
  }
  td {
    vertical-align: text-top;
  }
  .expandedRow {
    .ant-table-rtl {
      margin: 0 !important;
    }

    > td {
      &:hover, & {
        background: #F0F0F0;
      }
    }
  }
`;

export const SearchInputContainer = styled.div`
  display: inline-flex;
  margin-right: -12px;
  align-items: center;
`;

export const SearchMainInput = styled(Input)`
  max-width: 300px;
`;

export const AdvancedSearchContainer = styled(Panel)`
  margin-bottom: 12px;
  .ant-collapse-content-box {
    padding: 0;
  }
`;

export const AdvancedSearchFormContainer = styled(Card)`
  // background-color: yellow;
`;

export const ToggleAdvancedSearch = styled(Button)`
  align-items: center;
  display: inline-flex;
  margin-right: 16px;
  .anticon {
    font-size: 12px;
    margin-bottom: -4px;
  }
`;
