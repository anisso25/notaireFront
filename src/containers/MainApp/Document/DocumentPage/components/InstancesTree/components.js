import styled from 'styled-components';

import { Tree, Button, Table } from 'antd';

export const TreeContainer = styled.div`
  overflow: hidden;
`;

export const TheTree = styled(Tree)`
  background-color: transparent;
  .ant-tree-treenode, .ant-tree-treenode-motion {
    width: 100%;
    padding: 0;
    margin-bottom: ${props => `${props.theme.treeNodeBottomSpaceSize}px`}
  }

  .ant-tree-node-content-wrapper {
    width: 100%;
    background-color: #fff;

    border-radius: 5px;
    border: 2px solid ${props => props.theme.treeNodeHoverColor};
    padding: 1px;
    overflow: hidden;
    cursor: default;
    transition: .4s all;

    .ant-space {
      transition: .4s all;
      opacity: 0.7;
    }

    &:hover {
      background-color: #fff;
      border-color: ${props => props.theme.treeBordersColor};

      .ant-space {
        opacity: 1;
      }
    }
    &.ant-tree-node-selected {
      background-color: #fff;
    }
    z-index: 3;
  }



  .ant-tree-switcher {
    margin: ${props => `-${props.theme.treeNodeBottomSpaceSize}px`} 0;
    color: ${props => props.theme.treeBordersColor};
    font-size: 20px;
    width: ${props => `${props.theme.treeNodeRightSpaceSize}px`};
    .ant-tree-switcher-line-icon {
      margin-top: ${props => `${Number(props.theme.treeNodeBottomSpaceSize) + 3}px`};
    }

    .ant-tree-switcher-leaf-line {
      &::before {
        border-color: ${props => props.theme.treeBordersColor} !important;
        border-width: 2px !important;
        margin-right: -1px;
        top: -80px;
      }

      &::after {
        border-color: ${props => props.theme.treeBordersColor} !important;
        border-width: 2px !important;
        border-right : 2px solid ${props => props.theme.treeBordersColor} !important;
        height: ${props => `${Number(props.theme.treeNodeBottomSpaceSize) + 20}px`};
        width: ${props => `${(Number(props.theme.treeNodeRightSpaceSize) / 2) + 1}px`};
        margin-right: -1px
      }
    }
  }

  .ant-motion-collapse {
    margin-top: ${props => `-${props.theme.treeNodeBottomSpaceSize}px`} !important;
    .ant-tree-treenode {
      margin: ${props => `${props.theme.treeNodeBottomSpaceSize}px`} 0 !important;
    }
  }

  /*
  .ant-motion-collapse {
    margin-top: -96px !important;
    .ant-tree-treenode {
      margin: ${props => `${props.theme.treeNodeBottomSpaceSize}px`} 0 !important;
    }
  }
  */


  .ant-tree-indent-unit {
    width: ${props => `${props.theme.treeNodeRightSpaceSize}px`};
    &::before {
      z-index: 1;
      border-left: 2px solid ${props => props.theme.treeBordersColor} !important;
      left: ${props => `${(Number(props.theme.treeNodeRightSpaceSize) / 2) - 1}px`} !important;
      top: -96px !important;
      bottom: ${props => `-${Number(props.theme.treeNodeBottomSpaceSize) + 4}px`} !important;
    }
  }

  .ant-tree-treenode:nth-child(2) {
    .ant-tree-indent-unit-start::before {
      top: -105px !important;
    }

    .ant-tree-switcher {
      .ant-tree-switcher-leaf-line::after {
        height: 117px;
        top: -80px;
      }
    }
  }

  .ant-tree-treenode-leaf-last .ant-tree-switcher-leaf-line::before {
    margin-top: -80px !important;
    height: 80px !important;
    z-index: 1;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 8px 6px 6px;
`;
export const Title = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const SmallButton = styled(Button)`
  font-size: 0.9rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  .anticon {
    font-size: 14px;
    line-height: 0.8;
  }
`;

export const TheTable = styled(Table)`
  max-width: unset;
  margin: 0 -2px -2px;
  * {
    line-height: 1;
    font-size: 0.9rem;
    // border-color: ${props => props.theme.treeBordersColor} !important;
  }
`;
