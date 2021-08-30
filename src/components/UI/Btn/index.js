import React from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme/theme';
import Text from 'components/UI/Text';
import {useSelector} from 'react-redux';
import {loader} from 'store/selectors';
import {ButtonStyle, Icon} from './styles';

const Btn = ({
  title,
  onPress,
  color,
  background,
  fontSize,
  height,
  fontWeight,
  disabled,
  style,
  icon,
}) => {
  const loading = useSelector(loader);
  return (
    <ButtonStyle
      onPress={onPress}
      style={style}
      disabled={disabled || loading}
      showDisabled={disabled}
      background={background}
      color={color}
      height={height}>
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {icon ? <Icon name={icon} color={color} /> : null}
          <Text
            fontSize={fontSize}
            color={color}
            fontWeight={fontWeight}
            textAlign="center">
            {title}
          </Text>
        </>
      )}
    </ButtonStyle>
  );
};

Btn.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.string,
  background: PropTypes.string,
  fontSize: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  fontWeight: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
};

Btn.defaultProps = {
  onPress: () => {},
  color: theme.colors.white,
  background: theme.colors.primary,
  fontSize: '20px',
  fontWeight: 'normal',
  disabled: false,
  height: 50,
  style: {},
  icon: '',
};

export default Btn;
