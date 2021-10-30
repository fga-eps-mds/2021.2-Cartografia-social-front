/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View, Text} from 'components/UI';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {IconStyle} from './styles';

// import ScrollView from 'components/UI/ScrollView';
// import {Container, Header, HeaderText} from './styles';

function Profile(props) {
  const user = useSelector(auth);
  console.log(user.data.name);

  return (
    <DrawerContentScrollView {...props}>
      <View alignItems="center" justifyContent="center" my={4}>
        <IconStyle isPicture={false} user={user.data.name} />
        <Text fontWeight="bold">{user.data.name}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default Profile;
