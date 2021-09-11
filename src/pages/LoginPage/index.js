import React, {useState} from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import phoneValidator from 'validators/phone';
import phoneMask from 'masks/phoneMask';
import Btn from 'components/UI/Btn';
import Text from 'components/UI/Text';
import theme from 'theme/theme';
import {Container} from './styles';

// import {Alert} from 'react-native';
// import api from 'services/api';
// import {useDispatch} from 'react-redux';
// import * as Actions from 'store/actions';

const Page1 = ({navigation}) => {
  // const dispatch = useDispatch();

  const [phone, setPhone] = useState({
    isValid: false,
    value: '',
  });

  const [name, setName] = useState({
    isValid: false,
    value: '',
  });

  const formIsValid = () => {
    return phone.isValid && name.isValid;
  };

  const onPress = async () => {
    navigation.navigate('Page2');
    // dispatch(Actions.enableLoader());
    // const params = {}
    // try {
    //   await api.post('/route/', params);
    // } catch (error) {
    //   Alert.alert('Cartografia Social', 'Ocorreu um erro ao se conectar com o servidor');
    //   dispatch(Actions.disableLoader());
    // }
  };

  return (
    <ScrollView>
      <Container>
        <Text alignSelf="center" fontSize={theme.font.sizes.L} my={3}>
          Texto exemplo
        </Text>
        <Input
          label="Seu nome"
          onChange={(value) => setName(value)}
          value={name.value}
          autoCapitalize="words"
          rules={[required]}
        />
        <Input
          label="Número de telefone"
          onChange={(value) => setPhone(value)}
          value={phone.value}
          inputMask={phoneMask}
          keyboardType="numeric"
          rules={[required, phoneValidator]}
        />
        <Btn
          disabled={!formIsValid()}
          style={{marginVertical: 50}}
          title="Próximo"
          onPress={onPress}
        />
      </Container>
    </ScrollView>
  );
};

export default Page1;
