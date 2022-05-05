import React, {useState} from 'react';
import {Alert} from 'react-native';
import api from 'services/api';
import NetInfo from '@react-native-community/netinfo';
import required from 'validators/required';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import {Container, Header, HeaderText, About, ConfirmButton} from './styles';

export default function CreateCommunity() {
  const netInfo = NetInfo.useNetInfo();

  const [email, setEmail] = useState({
    isValid: false,
    value: '',
  });

  const formIsValid = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.value.trim());
  };

  const onSave = () => {
    const {isInternetReachable} = netInfo;
    if (!isInternetReachable) {
      Alert.alert('Erro', 'É necessário acesso a internet.');
      return;
    }

    const endpoint = 'community/sendCreationEmail';
    api
      .get(`${endpoint}/${email.value}`)
      .then(() => {
        Alert.alert('Sucesso', 'Confira as próximas instruções no seu email');
      })
      .catch(() => {});
  };

  return (
    <>
      <Header>
        <HeaderText>Solicitar Cadastro</HeaderText>
      </Header>
      <ScrollView>
        <Container>
          <About>
            Você pode preencher um formulário para solicitar o cadastro de uma
            comunidade.
          </About>
          <About>
            Uma vez enviado, a equipe do Nortear Cartografias irá análisar a sua
            solicitação. Se ela for aprovada, você receberá um email com o
            aviso.
          </About>
          <Input
            label="Digite seu email"
            onChange={setEmail}
            value={email.value}
            rules={[required]}
          />

          <ConfirmButton
            title="Enviar solicitação"
            onPress={onSave}
            disabled={!formIsValid()}
          />
        </Container>
      </ScrollView>
    </>
  );
}
