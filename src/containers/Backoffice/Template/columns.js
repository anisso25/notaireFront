import validationRules from '~/utils/validationRules';

export default (t) => [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    width: '40px',
    dataIndex: ['Category', 'icon'],
    key: 'category.icon',
    render: (value) => (
      <img src={value} width={32} height={32} alt="" />
    ),
  },
  {
    title: t('Global:name'),
    type: 'text',
    dataIndex: ['Category', 'name'],
    key: 'category.name',
    validationRules: [
      validationRules.required,
      validationRules.minChar(2),
    ],
  },
];
