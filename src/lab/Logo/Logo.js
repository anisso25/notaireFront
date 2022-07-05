import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LogoContainer = styled.div`
  
`;

const sizes = {
  small: '40x30',
  medium: '75x55',
  large: '120x88',
  xlarge: '200x147',
};

export default function Logo({ size }) {
  return (
    <LogoContainer>
      <img
        src={`https://dummyimage.com/${sizes[size]}/2593FC/000000&text=Notaire App`}
        alt={`Logo ${size}`}
      />
    </LogoContainer>
  );
}

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
};

Logo.defaultProps = {
  size: 'medium',
};
