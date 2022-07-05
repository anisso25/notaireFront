import React from 'react';
import styled from 'styled-components';

import { Modal } from 'antd';

const Container = styled.div`
  text-align: center;
  img {
    width: 70%;
  }
`;

function Preview({ image, onClose }) {
  return (
    <Modal
      title=" "
      visible={!!image}
      onCancel={onClose}
      width="80%"
      centered
      footer={null}
    >
      <Container>
        <img src={image} alt="" />
      </Container>
    </Modal>
  );
}

export default Preview;
