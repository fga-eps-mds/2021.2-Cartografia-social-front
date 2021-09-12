import React, {useState, useEffect} from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import * as Actions from 'store/actions';
import {Container, Header, HeadeText} from './styles';

// import {Alert} from 'react-native';
// import api from 'services/api';
// import {useDispatch} from 'react-redux';
// import * as Actions from 'store/actions';

const LoginPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  const [password, setPassword] = useState({
    isValid: false,
    value: '',
  });

  const [email, setEmail] = useState({
    isValid: false,
    value: '',
  });

  // eslint-disable-next-line no-shadow
  function onAuthStateChanged(user) {
    if (user != null) {
      const loginUser = {
        email: user.email,
        id: user.uid,
        token: '',
      };
      dispatch(Actions.login(loginUser));
      navigation.navigate('Map');
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const formIsValid = () => {
    return password.isValid && email.isValid;
  };

  const onPress = async () => {
    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  if (initializing) return null;

  return (
    <>
      <Header>
        <HeadeText my={3}>Fazer Login</HeadeText>
      </Header>
      <ScrollView>
        <Container>
          <Input
            label="Digite o email"
            onChange={(value) => setEmail(value)}
            value={email.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <Input
            label="Digite a senha"
            onChange={(value) => setPassword(value)}
            hide
            value={password.value}
            rules={[required]}
          />
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
