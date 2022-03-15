import React, {useState} from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import api from 'services/api';
import Btn from 'components/UI/Btn';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import * as Actions from 'store/actions';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {Container, Header, HeaderText, InputText, TextBtn} from './styles';

const LoginPage = ({navigation}) => {
  const dispatch = useDispatch();
  const navigateToScreen = async (screen) => {
    navigation.navigate(screen);
  };
  const [password, setPassword] = useState({
    isValid: false,
    value: '',
  });

  const [email, setEmail] = useState({
    isValid: false,
    value: '',
  });

  const formIsValid = () => {
    return password.isValid && email.isValid;
  };

  useFocusEffect(
    React.useCallback(() => {
      if (navigation.getParent()) {
        navigation.getParent().setOptions({headerShown: true});
      }
    }, []),
  );

  const setUser = async (userCredentials, token) => {
    const userLogIn = {
      name: userCredentials.user.displayName,
      id: userCredentials.user.providerId,
      token,
      demonstrationMode: false,
      email: email.value,
      data: null,
    };
    const userResponse = await api
      .get(
        'users/userByEmail',
        {
          params: {
            email: email.value,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .catch(async () => {
        Alert.alert('Atenção!', 'Erro ao pegar dados do usuário!');
        // eslint-disable-next-line no-console
        await AsyncStorage.setItem('access_token', '');
      });
    if (userResponse) {
      userLogIn.data = userResponse.data;
      dispatch(Actions.login(userLogIn));
    }
  };

  const onPress = async () => {
    try {
      const userCredentials = await auth().signInWithEmailAndPassword(
        email.value.trim(),
        password.value.trim(),
      );
      const token = await userCredentials.user.getIdToken();
      console.log(token);
      await AsyncStorage.setItem('access_token', `Bearer ${token}`);
      await setUser(userCredentials, token);
    } catch (error) {
      Alert.alert('Atenção!', 'Erro na etapa de autenticação!');
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <>
      <Header>
        <HeaderText my={3}>Fazer Login</HeaderText>
      </Header>
      <ScrollView>
        <Container>
          <InputText>Email</InputText>
          <Input
            label="Digite o email"
            onChange={(value) => setEmail(value)}
            value={email.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Senha</InputText>
          <Input
            label="Digite a senha"
            onChange={(value) => setPassword(value)}
            hide
            value={password.value}
            rules={[required]}
          />
          <TextBtn onPress={() => navigateToScreen('ForgotPasswordPage')}>
            Esqueci a senha
          </TextBtn>
          <Btn
            disabled={!formIsValid()}
            style={{marginVertical: 50}}
            title="Entrar"
            onPress={onPress}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default LoginPage;
