import lodashIsEmpty from 'lodash/isEmpty';

/**
 * Validate if value is a valid date
 * @param {String} value Param to do valid
 * @return {Object}
 * @property {Boolean} isValid `true` if value is a valid value
 * @property {String} errorText message of an invalid rule
 * */
const phone = (value) => {
  const errorObject = {
    isValid: false,
    errorText: 'Telefone em formato inválido',
  };

  const successObject = {
    isValid: true,
  };

  if (lodashIsEmpty(value)) {
    return successObject;
  }

  const regex = /\d+/g;

  let phoneNumber = value.match(regex);

  phoneNumber = phoneNumber ? phoneNumber.join('') : '';

  // Length including region identifier
  if (phoneNumber.length !== 11 && phoneNumber.length !== 13) {
    return errorObject;
  }

  return successObject;
};

export default phone;
