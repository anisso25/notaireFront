import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Button,
  Form,
  Row,
  Col,
} from 'antd';
// eslint-disable-next-line import/no-cycle
import formInputsBuilder from '~/utils/formBuilder';
import {
  AdvancedSearchFormContainer,
} from './components';

function AdvancedSearch({
  loading,
  columns,
  onParamsChange = () => {},
  isOpen,
}) {
  const { t } = useTranslation('Global');
  const [form] = Form.useForm();
  const [params, setParams] = useState(null);

  const onClearForm = () => {
    setParams(null);
    onParamsChange(null);
    form.resetFields();
  };

  const onChangeParams = (changedFields, allChangedFileds) => {
    setParams(
      allChangedFileds.reduce((a, v, index) => {
        if (v.value) {
          let { value } = v;
          if (moment.isMoment(v.value)) {
            value = value.format('YYYY-MM-DD');
          }
          return {
            ...a,
            [`search[${index}][key]`]: v?.name?.[0],
            [`search[${index}][value]`]: value,
          };
        }
        return a;
      }, {}),
    );
  };

  const onSearch = useCallback(() => {
    if (!params || Object.keys(params).length === 0) {
      return;
    }
    onParamsChange(params);
  }, [params]);

  useEffect(() => {
    if (!isOpen) {
      onClearForm();
    }
  }, [isOpen]);

  const handleEnterPressKey = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleEnterPressKey);
    return () => {
      window.removeEventListener('keypress', handleEnterPressKey);
    };
  }, [handleEnterPressKey]);

  return (
    <AdvancedSearchFormContainer>
      <Form
        layout="vertical"
        onFieldsChange={onChangeParams}
        form={form}
      >
        <Row gutter={24}>
          { formInputsBuilder(columns.map(item => ({
            ...item,
            dataIndex: item.EntityAttributeId,
          }))).map(item => item && (
            <Col span={6} key={`advanced_search_formItem_${item?.dataIndex}`}>
              {React.cloneElement(item, { rules: [] })}
            </Col>
          )) }
        </Row>
        <Button
          type="primary"
          onClick={onSearch}
          // loading={loading}
          disabled={loading}
          key="cta_search"
        >{t('search')}
        </Button>
        <Button
          type="link"
          danger
          onClick={onClearForm}
          disabled={loading}
          key="cta_clear_form"
        >{t('clear')}
        </Button>
      </Form>
    </AdvancedSearchFormContainer>
  );
}
export default AdvancedSearch;
