/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View, Text} from 'components/UI';
import {useSelector, useDispatch} from 'react-redux';
import {auth} from 'store/selectors';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import theme from 'theme/theme';
import * as Actions from 'store/actions';
import Btn from '../UI/Btn';

import {IconStyle} from './styles';

// import ScrollView from 'components/UI/ScrollView';
// import {Container, Header, HeaderText} from './styles';

function Profile(props) {
  const user = useSelector(auth);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(Actions.logout());
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View alignItems="center" justifyContent="center" my={4}>
          <IconStyle isPicture={false} user={user.data.name} />
          <Text fontWeight="bold">{user.data.name}</Text>
        </View>
        <View style={{flex: 1}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View justifyContent="flex-end">
        <Btn
          title="Sair"
          color={theme.colors.primary}
          background={theme.colors.white}
          onPress={onLogOut}
        />
      </View>
    </>
  );
}

export default Profile;
