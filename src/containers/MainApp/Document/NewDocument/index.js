import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '~/containers/Common/Layout/Layout';
import DocumentTypeSelector from './components/DocumentTypeSelector';
import { fetchGeneralData } from '~/containers/Common/HomePage/actions';

function NewDocument(props) {
  const { isFetching } = useSelector(state => state.general);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGeneralData());
  }, []);

  return (
    <Layout
      {...props}
      loading={isFetching}
      hideSidebar
    >
      <DocumentTypeSelector />
    </Layout>
  );
}

export default NewDocument;
