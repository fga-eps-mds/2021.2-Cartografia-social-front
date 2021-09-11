import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components/native';
// import {useSelector} from 'react-redux';
// import {auth} from 'store/selectors';

import theme from 'theme/theme';

import Page1 from 'pages/LoginPage';

import Map from 'pages/Map';
import InitialPage from 'pages/InitialPage';

const Routes = () => {
    // const user = useSelector(auth);

    const Stack = createStackNavigator();

    return ( <
        >
        <
        ThemeProvider theme = { theme } >
        <
        StatusBar barStyle = "dark-content"
        backgroundColor = { theme.colors.white }
        /> <
        NavigationContainer theme = {
            { colors: { background: theme.colors.white } } } >
        <
        Stack.Navigator initialRouteName = "InitialPage" >
        <
        Stack.Screen name = "Map"
        component = { Map }
        options = {
            { header: () => null } }
        />

        <
        Stack.Screen name = "InitialPage"
        component = { InitialPage }
        options = {
            { header: () => null } }
        />

        <
        Stack.Screen name = "Page1"
        component = { Page1 }
        />

        <
        /Stack.Navigator>

        <
        /NavigationContainer>

        <
        /ThemeProvider>

        <
        />
    );
};

export default Routes;