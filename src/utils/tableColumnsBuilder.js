import moment from 'moment';
import validationRules from '~/utils/validationRules';

export const stringColumnBuilder = (attr) => (
  {
    title: attr.name,
    EntityAttributeId: attr.id,
    type: 'text',
    dataIndex: attr.name,
    key: attr.name,
    validationRules: [
      validationRules.required,
      validationRules.string,
      validationRules.minChar(2),
    ],
  }
);

export const dateColumnBuilder = (attr) => (
  {
    title: attr.name,
    EntityAttributeId: attr.id,
    type: 'date',
    dataIndex: attr.name,
    key: attr.name,
    render: (value) => moment(value).format('YYYY/MM/DD'),
    validationRules: [
      validationRules.required,
      validationRules.date,
    ],
  }
);

export const enumColumnBuilder = (attr) => (
  {
    title: attr.name,
    EntityAttributeId: attr.id,
    type: 'select',
    dataIndex: attr.name,
    key: attr.name,
    values: attr.values.map(item => ({
      value: item,
      name: item,
    })),
    validationRules: [
      validationRules.required,
    ],
  }
);

export const countryColumnBuilder = (attr) => (
  {
    title: attr.name,
    EntityAttributeId: attr.id,
    type: 'select',
    dataIndex: attr.name,
    key: attr.name,
    values: attr.values,
    render: (value) => value?.name,
    validationRules: [
      validationRules.required,
    ],
  }
);

export const wilayaColumnBuilder = (attr) => (
  {
    title: attr.name,
    EntityAttributeId: attr.id,
    type: 'select',
    dataIndex: attr.name,
    key: attr.name,
    values: attr.values,
    render: (value) => value?.name,
    validationRules: [
      validationRules.required,
    ],
  }
);

export default function tableColumnsBuilder(attributes) {
  return attributes?.map(attr => {
    switch (attr.type) {
      case 'STRING':
        return stringColumnBuilder(attr);
      case 'DATE':
        return dateColumnBuilder(attr);
      case 'ENUM':
        return enumColumnBuilder(attr);
      case 'COUNTRY':
        return countryColumnBuilder(attr);
      case 'WILAYA':
        return wilayaColumnBuilder(attr);
      default:
        return undefined;
    }
  });
}
