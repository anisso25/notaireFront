import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import { Empty, Button, Space } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import $ from 'jquery';

import { a4Page } from '~/config';
import {
  DocumentContainer,
  PageContainer,
  ButtonsContainer,
} from './components';

export default function DocumentViewer({
  documentDetails,
  enablePrintButton,
  id,
  loading,
  extraButtons,
  onClickSection,
}) {
  const { t } = useTranslation(['Global', 'Document', 'Client']);
  const docRef = useRef();
  const printContent = useReactToPrint({
    content: () => docRef?.current,
    removeAfterPrint: true,
  });

  const formattedContent = useMemo(() => {
    let documentContent = documentDetails?.content || '';
    if (!documentContent) {
      return undefined;
    }
    documentContent = documentContent.replace(/(\r\n|\n|\r|\t)/gm, '');
    documentContent = documentContent.replaceAll('<p class="dashed-border">&nbsp;</p>', '<p>&nbsp;</p>');
    return documentContent;
  }, [documentDetails]);

  const handlePrint = React.useCallback(() => {
    if (docRef) {
      printContent();
    }
  }, [docRef, printContent]);

  const pxToMm = (px) => px * 0.2645;
  /**
   * HTML Splitter ALGORITHME
   * We start always by the last page, we remove elements from the bottom of the page until
   * the size will be lower then the A4 page size, then we put all the removed elements to another
   * page, then we do that recursively
   */
  const htmlDivider = useCallback((page) => {
    // Since we use jquery, we need to reset the DocumentContainer using DOM
    if (page === 1) {
      const pageContainer = $(`#${id} .page-container:first-child`)
        .clone()
        .html(formattedContent);
      $(`#${id}`).empty().append(pageContainer);
    }
    // Getting the last page
    let lastPage = $(`#${id} .page-container`);
    lastPage = lastPage.last();
    const children = lastPage.children().toArray();
    let lastPageOuterHeight = Math.ceil(pxToMm(lastPage.outerHeight(true)));
    const removed = [];
    while (lastPageOuterHeight > a4Page.height) {
      const child = children.pop();
      // JQuery Method detach() removes the "child" element from DOM for the current page
      $(child).detach();
      // Add element that was removed to the end of "removed" array
      removed.push(child);
      lastPageOuterHeight = Math.ceil(pxToMm(lastPage.outerHeight(true)));
    }

    // Add pagination
    lastPage.append($(`<div class="page-number">- ${t('Document:page_number', { number: page })} -</div>`));

    if (removed.length > 0) {
      // Add space between pages
      lastPage.after($('<div class="pages-separator"></div>'));
      const revRemoved = removed.reverse();

      // Start a new page
      const a4p = lastPage.clone().empty();
      // Add elements removed from last page to the new page
      a4p.append(revRemoved);

      // Add the new page to the document
      $(`#${id}`).append(a4p);
      htmlDivider(page + 1);
    }
  }, [t, id, formattedContent]);

  useEffect(() => {
    if (docRef.current) {
      setTimeout(() => {
        htmlDivider(1);
      }, 1000);
    }
  }, [htmlDivider, docRef, formattedContent]);

  useEffect(() => {
    if (!onClickSection) {
      return;
    }
    if (documentDetails?.content) {
      $(document).on(
        'click',
        '.custom-section',
        documentDetails,
        (event) => {
          event.stopPropagation();
          event.stopImmediatePropagation();
          const clickedSection = $(event.currentTarget);
          const tag = clickedSection.data('tag').split('.');
          switch (tag[0]) {
            case 'templateInputText': {
              const template = event?.data?.Template?.templateInputTexts?.find(
                (item) => String(item.id) === tag[1],
              );
              const documentInputText = event?.data?.documentInputTexts?.find(
                (item) => String(item.TemplateInputText.id) === tag[1],
              );
              onClickSection({
                ...(template || {}),
                templateId: template?.id,
                id: documentInputText?.id,
                value: clickedSection?.html(),
              });
              break;
            }
            default:
          }
        },
      );
    }
  }, [documentDetails]);

  return (
    <div>
      { !loading && formattedContent && (
        <>
          <DocumentContainer
            ref={docRef}
            id={id}
          >
            <PageContainer className="page-container" canEditSection={onClickSection} />
          </DocumentContainer>

          <ButtonsContainer>
            <Space size="middle">
              <Button
                type="primary"
                icon={<PrinterOutlined />}
                size="large"
                shape="round"
                onClick={handlePrint}
                disabled={!enablePrintButton}
                key="cta_print_document"
              >
                { t('Document:print') }
              </Button>

              {extraButtons}
            </Space>
          </ButtonsContainer>
        </>
      ) }

      { !loading && !formattedContent && <Empty /> }
    </div>
  );
}

DocumentViewer.propTypes = {
  documentDetails: PropTypes.objectOf(PropTypes.any),
  enablePrintButton: PropTypes.bool,
  id: PropTypes.string,
  loading: PropTypes.bool,
  extraButtons: PropTypes.arrayOf(PropTypes.node),
  onClickSection: PropTypes.func,
};

DocumentViewer.defaultProps = {
  documentDetails: {},
  enablePrintButton: true,
  id: 'document-container',
  loading: false,
  extraButtons: undefined,
  onClickSection: undefined,
};
