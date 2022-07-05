import React, { useState } from 'react';
import {
  Button,
  Modal,
  Input,
} from 'antd';
// eslint-disable-next-line import/no-cycle
// import TemplateEditor from '../TemplateEditor/TemplateEditor';

function TagModal({
  visible,
  onClose,
}) {
  const [tagname, setTagname] = useState('');
  const [suffix, setSuffix] = useState('');
  const [prefix, setPrefix] = useState('');

  const onCreateTag = () => {
    const event = new CustomEvent('canInsertTag', {
      detail: {
        tagname,
        suffix,
        prefix,
      },
      bubbles: true,
    });
    const button = document.getElementById('buttonTest');
    button.dispatchEvent(event);
    setTagname('');
    setSuffix('');
    setPrefix('');
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
          Add a tag
        </Button>,
      ]}
    >
      tagname:
      <Input
        value={tagname}
        onChange={(event) => setTagname(event.target.value)}
      />
      suffix:
      <Input
        value={suffix}
        onChange={(event) => setSuffix(event.target.value)}
      />
      prefix:
      <Input
        value={prefix}
        onChange={(event) => setPrefix(event.target.value)}
      />
      <br />
      <br />
      { /* <TemplateEditor withTagPlugin={false} minimalToolbar /> */ }
    </Modal>
  );
}
export default TagModal;
