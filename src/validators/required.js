import lodashIsEmpty from 'lodash/isEmpty';

/**
 * Validate if value is true
 * @param {String} value Param to do valid
 *
 * @return {Object}
 * @property {Boolean} isValid `true` if value is a valid value
 * @property {String} errorText message of an invalid rule
 * */
const required = (questionsFormList, value) => {
  const errorText =
    questionsFormList.errorMessage || 'Este campo é obrigatório';
  const errorObject = {
    isValid: false,
    errorText,
  };

  if (lodashIsEmpty(value)) {
    return errorObject;
  }
  if (value.match(questionsFormList.validationRegex)) {
    return {
      isValid: true,
      errorText: '',
    };
  }
  return errorObject;
};

export default required;
