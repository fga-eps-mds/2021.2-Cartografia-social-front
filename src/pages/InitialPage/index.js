import React from 'react';
import Btn from 'components/UI/Btn';
import Text from 'components/UI/Text';
import theme from 'theme/theme';
import {Container, Logo} from './styles';

// import {useDispatch} from 'react-redux';
// import * as Actions from 'store/actions';

const InitialPage = ({navigation}) => {
  // const dispatch = useDispatch();

  const navigateToScreen = async (screen) => {
    navigation.navigate(screen);
  };

  return (
    <Container>
      <Text
        alignSelf="center"
        fontSize={theme.font.sizes.L}
        fontWeight="bold"
        m={3}>
        Nova Cartografia Social
      </Text>
      <Logo />
      <Btn
        style={{marginVertical: 10}}
        title="Modo de demonstração"
        onPress={() => navigateToScreen('Map')}
      />
      <Btn
        style={{marginVertical: 10}}
        title="Login"
        onPress={() => navigateToScreen('LoginPage')}
      />
      <Btn
        style={{marginVertical: 10}}
        title="Solicitar apoio"
        onPress={() => navigateToScreen('DynamicForm')}
      />
    </Container>
  );
};

export default InitialPage;
