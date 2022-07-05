import { UploadOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
} from 'antd';
// eslint-disable-next-line import/no-cycle
import { CDatePicker } from '~/lab';

const { Option } = Select;

export const inputTextBuilder = (input, errorMessage) => (
  <Form.Item
    name={input.dataIndex}
    label={input.title}
    validateStatus={errorMessage && 'error'}
    help={errorMessage}
    rules={input.validationRules}
    key={`form_item_${input.key}`}
  >
    <Input />
  </Form.Item>
);

export const inputPasswordBuilder = (input, errorMessage) => (
  <Form.Item
    name={input.dataIndex}
    label={input.title}
    validateStatus={errorMessage && 'error'}
    help={errorMessage}
    rules={input.validationRules}
    key={`form_item_${input.key}`}
  >
    <Input.Password />
  </Form.Item>
);

export const inputDateBuilder = (input, errorMessage) => (
  <Form.Item
    name={input.dataIndex}
    label={input.title}
    validateStatus={errorMessage && 'error'}
    help={errorMessage}
    rules={input.validationRules}
    key={`form_item_${input.key}`}
  >
    <CDatePicker />
  </Form.Item>
);

export const inputSelectBuilder = (input, errorMessage) => (
  <Form.Item
    name={input.dataIndex}
    label={input.title}
    validateStatus={errorMessage && 'error'}
    help={errorMessage}
    rules={input.validationRules}
    key={`form_item_${input.key}`}
  >
    <Select allowClear>
      { input?.values?.map(item => (
        <Option key={`form_item_value_${item.value}`} value={item.value}>{item.name}</Option>
      )) }
    </Select>
  </Form.Item>
);

export const inputFileBuilder = (input, errorMessage) => (
  <Form.Item
    name={input.dataIndex}
    label={input.title}
    validateStatus={errorMessage && 'error'}
    help={errorMessage}
    rules={input.validationRules}
    key={`form_item_${input.key}`}
  >
    <Upload
      beforeUpload={() => false}
      maxCount={1}
      listType="picture"
    >
      <Button icon={<UploadOutlined />}>{input.buttonText}</Button>
    </Upload>
  </Form.Item>
);

export default function formInputsBuilder(columns, tempInputErrors) {
  return columns?.map(input => {
    switch (input.type) {
      case 'text':
        return inputTextBuilder(input, tempInputErrors?.[input.dataIndex]);
      case 'password':
        return inputPasswordBuilder(input, tempInputErrors?.[input.dataIndex]);
      case 'date':
        return inputDateBuilder(input, tempInputErrors?.[input.dataIndex]);
      case 'select':
        return inputSelectBuilder(input, tempInputErrors?.[input.dataIndex]);
      case 'file':
        return inputFileBuilder(input, tempInputErrors?.[input.dataIndex]);
      default:
        return undefined;
    }
  });
}
