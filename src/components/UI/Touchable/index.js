/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';

const Touchable = ({onPress, style, children, ...props}) => (
  <Ripple
    style={style}
    hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
    onPress={onPress}
    {...props}>
    {children}
  </Ripple>
);

Touchable.propTypes = {
  onPress: PropTypes.func,
};

Touchable.defaultProps = {
  onPress: () => {},
};

export default Touchable;
