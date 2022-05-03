import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import Btn from 'components/UI/Btn';
import Input from 'components/UI/Input';
import ScrollView from 'components/UI/ScrollView';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from 'services/loginService';
import * as Actions from 'store/actions';
import required from 'validators/required';

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

  const netInfo = NetInfo.useNetInfo();

  const onPress = async () => {
    try {
      const {isInternetReachable} = netInfo;
      const userResponse = await login(
        email.value,
        password.value,
        !isInternetReachable,
      );
      if (userResponse) {
        dispatch(Actions.login({...userResponse, demonstrationMode: false}));
      }
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

          <TextBtn
            onPress={() => navigateToScreen('UserRegistrationRequestPage')}>
            Solicitar cadastro
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
