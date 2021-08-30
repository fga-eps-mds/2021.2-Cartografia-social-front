import React from 'react';
import {SafeAreaView, StatusBar, Platform} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';

import theme from 'theme/theme';

import Page1 from 'pages/Page1';
import Page2 from 'pages/Page2';

const Routes = () => {
  const user = useSelector(auth);

  const Stack = createStackNavigator();

  const safeAreaViewStyle = {
    flexGrow: 1,
    backgroundColor: theme.colors.white,
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          style={safeAreaViewStyle}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.white}
          />
          <NavigationContainer
            theme={{colors: {background: theme.colors.white}}}>
            <Stack.Navigator
              initialRouteName={user && user.id ? 'Page2' : 'Page1'}>
              <Stack.Screen
                name="Page1"
                component={Page1}
                // options={{header: () => <Header />}}
              />
              <Stack.Screen name="Page2" component={Page2} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </>
  );
};

export default Routes;
