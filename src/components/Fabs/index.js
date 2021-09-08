import React, {useEffect, useState} from 'react';
import {LayoutAnimation} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Icon, Option} from './styles';

const Fabs = ({actions, alwaysOpenActions}) => {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (showOptions) {
      LayoutAnimation.easeInEaseOut();
    } else {
      LayoutAnimation.spring();
    }
  }, [showOptions]);

  const onPressItem = (item) => {
    setShowOptions(false);
    item.onPress();
  };

  const renderItem = (item) => (
    <Option size={40} onPress={() => onPressItem(item)}>
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
      <Option size={50} onPress={() => setShowOptions(!showOptions)}>
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
