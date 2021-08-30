/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import React from 'react';

const ScrollView = ({children, ...props}) => (
  <KeyboardAwareScrollView
    style={{zIndex: 1}}
    showsVerticalScrollIndicator={false}
    resetScrollToCoords={{x: 0, y: 0}}
    enableOnAndroid
    keyboardShouldPersistTaps="handled"
    enableAutomaticScroll
    scrollEnabled
    {...props}>
    {children}
  </KeyboardAwareScrollView>
);

export default ScrollView;
