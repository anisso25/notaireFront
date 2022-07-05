
export default {
  required: { required: true },
  string: {
    type: 'string',
    message: 'القيمة المدخلة غير صالحة',
  },
  lettersOnly: {
    pattern: new RegExp(/^[A-Za-zء-ي]+/g),
    message: 'يجب أن يكون أحرفًا أبجدية فقط',
  },
  minChar: (length) => ({
    min: length,
  }),
  date: {
    type: 'date',
  },
  email: {
    type: 'email',
  },
  file: {
    type: 'object',
  },
  year: {
    pattern: new RegExp(/^[1-9][0-9][0-9][0-9]/g),
    message: 'السنة المدخلة غير صالحة',
  },
};
