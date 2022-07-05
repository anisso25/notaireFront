import validationRules from '~/utils/validationRules';

export default (t, action) => [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: t('Global:name'),
    type: 'text',
    dataIndex: 'name',
    key: 'name',
    validationRules: [
      validationRules.required,
      validationRules.minChar(2),
    ],
  },
  {
    title: t('AppManagement:category.icon'),
    type: 'file',
    dataIndex: 'icon',
    key: 'icon',
    buttonText: t('Global:choose_image'),
    render: (value) => (
      <img src={value} width={32} height={32} alt="" />
    ),
    validationRules: action === 'create'
      ? [
        validationRules.required,
        validationRules.file,
      ]
      : [
        validationRules.file,
      ],
  },
];
