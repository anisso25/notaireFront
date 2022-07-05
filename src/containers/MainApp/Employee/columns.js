import { Tag } from 'antd';
import validationRules from '~/utils/validationRules';
import { employeesTypesColors } from '~/config';

export default (t, action) => [
  {
    title: t('Global:firstName'),
    type: 'text',
    dataIndex: 'name',
    key: 'name',
    validationRules: [
      validationRules.required,
      validationRules.minChar(2),
    ],
  },
  {
    title: t('Global:email'),
    type: 'text',
    dataIndex: 'email',
    key: 'email',
    validationRules: [
      validationRules.required,
      validationRules.minChar(2),
    ],
  },
  {
    title: t('Employee:employee_type'),
    type: 'select',
    dataIndex: 'type',
    key: 'type',
    render: (value) => {
      let tempVal = value;
      tempVal = tempVal?.toLowerCase();
      return <Tag color={employeesTypesColors[tempVal]}>{t(`Global:${tempVal}`)}</Tag>;
    },
    values: [
      { name: t('Global:admin'), value: 'ADMIN' },
      { name: t('Global:employee'), value: 'EMPLOYEE' },
    ],
    validationRules: [
      validationRules.required,
    ],
  },
  {
    title: t('Global:password'),
    type: 'password',
    dataIndex: 'password',
    key: 'password',
    validationRules: action === 'create'
      ? [
        validationRules.required,
        validationRules.minChar(6),
      ]
      : [
        validationRules.minChar(6),
      ],
  },
];
