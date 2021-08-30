import React, {useRef, useState, useEffect} from 'react';
import {PixelRatio} from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme/theme';
import {TextField} from 'rn-material-ui-textfield';

const Input = ({
  label,
  keyboardType,
  returnKeyType,
  autoCapitalize,
  hide,
  disabled,
  value,
  maxLength,
  minLength,
  onChange,
  onError,
  inputMask,
  rules,
  rightAccessory,
  baseColor,
  tintColor,
  errorColor,
  focus,
  textColor,
  errorMessage,
  externalError,
  multiline,
  autoCorrect,
}) => {
  const inputEl = useRef(null);

  const [validationError, setValidationError] = useState('');
  const [blurredOnce, setBlurredOnce] = useState(false);

  const validateInput = (inputValue) => {
    let errorText = '';

    if (rules.length) {
      rules.forEach((rule) => {
        const currentRule = rule(inputValue, errorMessage);
        if (!currentRule.isValid && errorText === '') {
          errorText = currentRule.errorText;
        }
      });
    }
    return errorText;
  };

  const inputChanged = (inputValue) => {
    const error = validateInput(inputValue);
    if (blurredOnce) {
      setValidationError(error);
    }

    onChange({value: inputValue, isValid: !error});
  };

  // Validate component when it is mounted with value
  useEffect(() => {
    if (value) {
      validateInput();
    }

    if (focus) {
      setTimeout(() => {
        inputEl.current.focus();
      }, 200);
      // Keyboard.removeSubscription;
    }
  }, []);

  useEffect(() => {
    if (blurredOnce) {
      inputChanged(value);
    }
  }, [blurredOnce, value]);

  return (
    <TextField
      label={label}
      keyboardType={hide ? 'default' : keyboardType}
      returnKeyType={returnKeyType}
      autoCapitalize={autoCapitalize}
      baseColor={baseColor}
      tintColor={tintColor}
      errorColor={errorColor}
      textColor={textColor}
      fontSize={PixelRatio.get() <= 1.5 ? 12 : 16}
      value={value}
      secureTextEntry={hide}
      maxLength={maxLength}
      disabled={disabled}
      lineWidth={1}
      minLength={minLength}
      onChangeText={inputChanged}
      onBlur={() => {
        setBlurredOnce(true);
      }}
      formatText={inputMask}
      onError={onError}
      error={externalError || validationError}
      ref={inputEl}
      renderRightAccessory={rightAccessory}
      multiline={multiline}
      autoCorrect={autoCorrect}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  hide: PropTypes.bool,
  disabled: PropTypes.bool,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  value: PropTypes.string.isRequired,
  rules: PropTypes.arrayOf(PropTypes.func),
  onError: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  rightAccessory: PropTypes.func,
  inputMask: PropTypes.func,
  baseColor: PropTypes.string,
  tintColor: PropTypes.string,
  errorColor: PropTypes.string,
  textColor: PropTypes.string,
  focus: PropTypes.bool,
  externalError: PropTypes.string,
  multiline: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  errorMessage: PropTypes.bool,
};

Input.defaultProps = {
  hide: false,
  disabled: false,
  keyboardType: 'default',
  returnKeyType: 'default',
  autoCapitalize: 'none',
  rules: [],
  onError: () => {},
  maxLength: 50,
  minLength: 0,
  rightAccessory: () => {},
  inputMask: (text) => text,
  baseColor: theme.colors.grey,
  tintColor: theme.colors.grey,
  textColor: theme.colors.black,
  errorColor: theme.colors.red,
  focus: false,
  errorMessage: false,
  externalError: '',
  multiline: false,
  autoCorrect: false,
};

export default Input;
