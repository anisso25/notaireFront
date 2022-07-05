import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
import styled from 'styled-components';

import {
  Modal,
  Form,
  Typography,
  Space,
  Button,
} from 'antd';

const { Title } = Typography;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  h4 {
    margin-bottom: 0 !important;
  }
`;
const EditorContainer = styled.div`
  > div:last-child {
    border: 1px hsl( 0, 0%, 82.7% ) solid;
    box-shadow: 0 0 5px hsla( 0, 0%, 0%, .1 );
    background-color: white;
  }
  .ck-editor__editable_inline {
    min-height: 250px;
  }
`;

function EditSectionModal({
  onClose,
  onEditDone,
  data,
}) {
  const { t } = useTranslation(['Document', 'Global', 'AppManagement']);
  const { isUpdating } = useSelector(state => state.document);
  const [content, setContent] = useState('');
  const [textEditor, setTextEditor] = useState();

  const editorConfiguration = useMemo(() => ({
    language: 'ar',
    toolbar: {
      items: [
        'heading',
        '|',
        'removeFormat',
        'horizontalLine',
        'restrictedEditingException',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'fontColor',
        'fontBackgroundColor',
        // 'highlight',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        '-',
        // 'pageBreak',
        // '|',
        'alignment',
        'outdent',
        'indent',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'blockQuote',
        'specialCharacters',
        // 'imageUpload',
        // 'imageInsert',
        'insertTable',
        '|',
        'undo',
        'redo',
        '|',
      ],
      shouldNotGroupWhenFull: true,
    },
    fontFamily: {
      options: ['NotoNaskhArabic'],
    },
    heading: {
      options: [
        {
          model: 'paragraphDashedEnding',
          view: {
            name: 'p',
            classes: 'dashed-ending',
          },
          title: t('AppManagement:template.paragraph_dashed_ending'),
          class: 'ck-heading_paragraph',
          // It needs to be converted before the standard 'paragraph'.
          converterPriority: 'high',
        },
      ],
    },
  }), [t]);

  useEffect(() => {
    if (data && textEditor) {
      setContent(data?.value || '');
      textEditor?.setData(data?.value || '');
    }
  }, [data, textEditor]);

  const clearContent = () => {
    setContent('');
  };

  const returnToOriginalContent = () => {
    setContent(data?.value);
  };

  const onCancelChanges = () => {
    onEditDone({
      editDocumentInputText: {
        id: data?.id,
        value: data?.defaultValue,
      },
    });
    onClose();
  };

  const handleSubmit = useCallback(() => {
    onEditDone({
      editDocumentInputText: {
        id: data?.id,
        value: content,
      },
    });
    onClose();
  }, [data, content]);

  return (
    <Modal
      title={t('Document:edit_section')}
      visible={!!data}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={isUpdating}
      okText={t('Global:edit')}
      width="80%"
      footer={[
        <Button
          type="default"
          onClick={onClose}
          key="cta_cancel"
        >{t('Global:cancel')}
        </Button>,
        <Button
          type="default"
          onClick={onCancelChanges}
          key="cta_cancel_changes"
          danger
        >{t('Document:cancel_changes')}
        </Button>,
        <Button
          type="primary"
          onClick={handleSubmit}
          key="cta_submit"
        >{t('Global:edit')}
        </Button>,
      ]}
    >
      <TitleContainer>
        <Title level={4}>{data?.name}</Title>
        <Space>
          <Button danger type="text" onClick={clearContent}>
            { t('Global:clear') }
          </Button>
          <Button type="default" onClick={returnToOriginalContent}>
            { t('Document:back_to_original_content') }
          </Button>
        </Space>
      </TitleContainer>
      <Form layout="vertical">
        <Form.Item>
          <EditorContainer>
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              data={content || ''}
              onReady={editor => {
                if (editor) {
                  editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                  );
                  setTextEditor(editor);
                  const fontFamily = editor.commands.get('fontFamily');
                  fontFamily.execute({ value: 'NotoNaskhArabic' });
                  editor.execute('heading', { value: 'paragraphDashedEnding' });
                }
              }}
              onChange={(event, editor) => {
                const fontFamily = editor.commands.get('fontFamily');
                fontFamily.execute({ value: 'NotoNaskhArabic' });
                const d = editor.getData();
                if (d !== content) {
                  setContent(d);
                }
              }}
            />
          </EditorContainer>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditSectionModal;
