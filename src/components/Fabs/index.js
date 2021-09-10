import React, {useEffect, useState} from 'react';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Icon, Option} from './styles';

const Fabs = ({actions, alwaysOpenActions}) => {
  const [showOptions, setShowOptions] = useState(false);

  const onPressOpenOptions = () => {
    setShowOptions(!showOptions)
    if (showOptions) {
      LayoutAnimation.easeInEaseOut();
    } else {
      LayoutAnimation.spring();
    }
  }

  const onPressItem = (item) => {
    setShowOptions(false);
    item.onPress();
  };

  const renderItem = (item, index) => (
    <Option key={index} size={40} onPress={() => onPressItem(item)}>
      <Icon size={25} name={item.icon} />
    </Option>
  );

  const Options = ({items}) => {
    return items.map(renderItem);
  };

  return (
    <Container>
      <Options items={alwaysOpenActions} />
      {showOptions ? <Options items={actions} /> : null}
      <Option size={50} onPress={onPressOpenOptions}>
        <Icon size={25} name={showOptions ? 'times' : 'plus'} />
      </Option>
    </Container>
  );
};

Fabs.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ),
  alwaysOpenActions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ),
};

Fabs.defaultProps = {
  actions: [],
  alwaysOpenActions: [],
};
export default Fabs;
