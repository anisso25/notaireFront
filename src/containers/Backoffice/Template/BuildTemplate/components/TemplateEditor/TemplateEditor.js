import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
import styled from 'styled-components';
import { Divider } from 'antd';
// eslint-disable-next-line import/no-cycle
import TagModal from '../TagModal/TagModal';

import { DocumentViewer } from '~/lab';
import { a4Page } from '~/config';

const EditorContainer = styled.div`
  > div:last-child {
    width: ${a4Page.width}mm;
    height: 100%;
    min-height: ${a4Page.height}mm;
    padding: ${a4Page.margin.top}mm ${a4Page.margin.right}mm ${a4Page.margin.bottom}mm ${a4Page.margin.left}mm;
    border: 1px hsl( 0, 0%, 82.7% ) solid;
    box-shadow: 0 0 5px hsla( 0, 0%, 0%, .1 );
    background-color: white;
    margin: 2.5rem auto;
  }
`;

function TemplateEditor({
  withTagPlugin = true,
  minimalToolbar = false,
  isReadOnly = false,
  showDocumentViewer = false,
  documentViewerTitle,
}) {
  const { t } = useTranslation(['AppManagement']);
  const [edt, setEdt] = useState();
  const [showTagModal, setShowTagModal] = useState(false);
  const [templateContent, setTemplateContent] = useState();

  const editorConfiguration = useMemo(() => {
    let toolbarItems;
    if (minimalToolbar) {
      toolbarItems = [
        'removeFormat',
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
        'alignment',
        'outdent',
        'indent',
        '|',
        'undo',
        'redo',
        '|',
      ];
    } else {
      toolbarItems = [
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
      ];
    }

    const config = {
      language: 'ar',
      toolbar: {
        items: toolbarItems,
        shouldNotGroupWhenFull: true,
      },
      fontFamily: {
        options: ['NotoNaskhArabic'],
      },
      heading: {
        options: [
          {
            model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph',
          },
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
          {
            model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1',
          },
          {
            model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2',
          },
        ],
      },
    };

    if (withTagPlugin) {
      config.toolbar.items = [
        'insertTag',
        '|',
        ...config.toolbar.items,
      ];
      config.insertTag = {
        buttonTitle: t('AppManagement:template.insert_tag'),
        openModal() {
          setShowTagModal(true);
        },
      };
    }
    return config;
  }, [t, minimalToolbar, withTagPlugin]);

  return (
    <>
      {!showDocumentViewer && (
        <EditorContainer>
          <CKEditor
            onReady={editor => {
              if (isReadOnly) {
                // eslint-disable-next-line no-param-reassign
                editor.isReadOnly = true;
              } else {
                editor.ui.getEditableElement().parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement(),
                );
              }
              setEdt(editor);
              const fontFamily = editor.commands.get('fontFamily');
              fontFamily.execute({ value: 'NotoNaskhArabic' });
            }}
            onError={({ willEditorRestart }) => {
              // If the editor is restarted, the toolbar element will be created once again.
              // The `onReady` callback will be called again and the new toolbar will be added.
              // This is why you need to remove the older toolbar.
              if (willEditorRestart) {
                edt.ui.view.toolbar.element.remove();
              }
            }}
            onChange={(event, editor) => {
              const fontFamily = editor.commands.get('fontFamily');
              fontFamily.execute({ value: 'NotoNaskhArabic' });
              setTemplateContent(editor.getData());
              // editor.execute('pageBreak');
            }}
            editor={Editor}
            data={templateContent}
            config={editorConfiguration}
          />
        </EditorContainer>
      )}
      <TagModal
        visible={showTagModal}
        onClose={() => setShowTagModal(false)}
      />
      {showDocumentViewer && (
        <>
          <Divider>{documentViewerTitle}</Divider>
          <DocumentViewer
            documentContent={templateContent}
            enablePrintButton
          />
        </>
      )}
    </>
  );
}
export default TemplateEditor;
