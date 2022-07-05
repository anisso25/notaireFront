import styled, { css } from 'styled-components';
import { a4Page } from '~/config';
import './style/ckeditor.css';

export const ButtonsContainer = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;

export const DocumentContainer = styled.div`
  font-family: 'NotoNaskhArabic';
  font-size: 12pt;
  direction: rtl;

  .pages-separator {
    display: block;
    height: 1rem;
  }

  @media print 
  {
    @page {
      // size: A4;
      size: ${a4Page.width}mm ${a4Page.height}mm; 
    }
    .pages-separator {
      display: none;
    }
  }
`;

export const PageContainer = styled.div`
  position: relative;
  direction: rtl;
  font-family: 'NotoNaskhArabic';
  box-sizing: border-box;
  display: block;

  padding: ${a4Page.margin.top}mm ${a4Page.margin.right}mm ${a4Page.margin.bottom}mm ${a4Page.margin.left}mm;
  margin: 0 auto;
  border: 1px hsl( 0, 0%, 82.7% ) solid;
  box-shadow: 0 0 5px hsla( 0, 0%, 0%, .1 );
  width: ${a4Page.width}mm;
  height: 100%;
  min-height: ${a4Page.height - 1}mm;
  background: white;
  transition: .3s all;
  * {
    word-break: break-word;
  }

  @media print 
  {
    border: none;
    box-shadow: none
  }

  p.dashed-ending {
    position: relative;
    span:last-child {
        display: inline;
        z-index: 1;
        position: relative;
        padding-left: 5px;
        background-color: white;
    }
    &:before {
      content: '';
      position: absolute;
      bottom: 8px;
      width: 100%;
      height: 0;
      border-bottom: 2px dashed;
    }
  }

  .custom-tag {
    font-family: sans-serif, Arial, Verdana, "Trebuchet MS", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    display: inline-flex !important;
    color: ${props => props.theme.tagTextColor};
    background-color: ${props => props.theme.tagBackgroundColor} !important;
    font-size: 10pt;
    line-height: normal;
    cursor: pointer;
    font-weight: normal;
    border-radius: 5px;
    padding: 1px 6px !important;
    // justify-content: space-between;

    border-width: var(--ck-widget-outline-thickness);
    border-style: solid;
    border-color: transparent;
    transition: border-color 200ms ease;
    box-sizing: border-box;
    &:hover {
      border-color: ${props => props.theme.tagHoverBorderColor};
    }
  }

  ${props => props.canEditSection && css`
    .custom-section {
      position: relative;
      cursor: pointer;
      outline-width: var(--ck-widget-outline-thickness);
      outline-style: solid;
      outline-color: transparent;
      transition: all 200ms ease;
      border-radius: 1px;
      outline-offset: 8px;
      z-index: 0;

      &:after {
        display: flex;
        content: '\\270E';
        position: absolute;
        top: -18px;
        left: -18px;
        z-index: 1;
        padding: 5px;
        background-color: white;
        font-size: 18px;
        line-height: 1;
        padding: 3px 3px 0 3px;
        color: ${props.theme.tagTextColor};
        transform: rotateY(-180deg);
      }

      &:hover {
        outline-color: ${props.theme.sectionBorderColor};
        &:after {
          color: ${props.theme.sectionBorderColor};
        }
      }


      .custom-tag {
        // cursor: default;
        &:hover {
          border-color: transparent;
        }
      }
    };
  `}


  /*
  .custom-tag {

    font-family: sans-serif, Arial, Verdana, "Trebuchet MS", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    display: inline-flex !important;
    color: #2E9765;
    background-color: #F2F2F2 !important;
    font-size: inherit;
    line-height: normal;
    cursor: pointer;
    font-weight: normal;
    outline-offset: -2px;
    padding: 5px 0 !important;
    // justify-content: space-between;

    &::after, &::before {
      font-family: 'NotoNaskhArabic';
      display: inline-flex;
      color: initial;
      background-color: white;
      margin: -5px 0;
      align-items: center;
    }

    &::after {
      content: attr(suffix);
      margin-right: 5px;
      padding-right: 3px;
    }

    &::before {
      content: attr(prefix);
      margin-left: 5px;
      padding-left: 3px;
    }

    outline-width: var(--ck-widget-outline-thickness);
    outline-style: solid;
    outline-color: transparent;
    transition: outline-color 200ms ease;

    &:hover {
      outline-color: #FEC200;
    }

  }
  */

  .page-number {
    position: absolute;
    bottom: 20px;
    left: 0px;
    right: 0px;
    text-align: center;
  }
  
  &:hover {
    outline: none;
    border: 1px solid hsl(208,79%,51%);
    box-shadow: 2px 2px 3px rgba(0,0,0,0.1),0 0;
  }

  @media print 
  {
    @page {
      margin: 0;
    }
    box-shadow: none;
    border: none;
    .custom-section:after {
      display: none;
    }
  }
`;
