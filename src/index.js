import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import enEG from 'antd/lib/locale/ar_EG';
import App from './App';
import '~/lib/i18n';
import reportWebVitals from './reportWebVitals';
import { PageLoading } from '~/lab';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<PageLoading />}>
      <ConfigProvider direction="rtl" locale={enEG}>
        <App />
      </ConfigProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
