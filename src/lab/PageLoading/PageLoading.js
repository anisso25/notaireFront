import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';

const MainLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const LoaderIcon = styled(LoadingOutlined)`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
`;

const Component = ({ size, color }) => (
  <MainLoader>
    <LoaderIcon size={size} color={color} />
  </MainLoader>
);

Component.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Component.defaultProps = {
  color: '#3F5486',
  size: 70,
};

export default Component;
