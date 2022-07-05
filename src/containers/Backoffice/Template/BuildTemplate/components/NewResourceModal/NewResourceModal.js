import React, { useState } from 'react';
import {
  Button,
  Modal,
  Input,
} from 'antd';

function NewResourceModal({
  visible,
  onClose,
}) {
  const [tagName, setTagName] = useState('');
  const onCreateTag = () => {
    const event = new CustomEvent('canInsertTag', { detail: tagName, bubbles: true });
    const button = document.getElementById('buttonTest');
    button.dispatchEvent(event);
    setTagName('');
    onClose();
  };

  return (
    <Modal
      title="Test"
      visible={visible}
      onCancel={onClose}
      width="22cm"
      footer={[
        <Button
          type="primary"
          onClick={onCreateTag}
          id="buttonTest"
        >
          Ajouter la ressource
        </Button>,
      ]}
    >
      <Input onChange={(event) => setTagName(event.target.value)} />
      <br />
      <br />
    </Modal>
  );
}
export default NewResourceModal;
