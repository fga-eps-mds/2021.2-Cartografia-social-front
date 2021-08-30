/* eslint-disable no-param-reassign */
const phoneMask = (text) => {
  text = text.replace(/\D/g, '');
  text = text.replace(/^(\d{2})(\d)/g, '($1) $2');
  text = text.replace(/(\d)(\d{4})$/, '$1-$2');
  return text;
};

export default phoneMask;
