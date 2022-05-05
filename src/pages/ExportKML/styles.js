import styled from 'styled-components/native';
import theme from 'theme/theme';
import normalize from 'react-native-normalize';
import Btn from 'components/UI/Btn';

export const Main = styled.View`
  flex: 1;
  margin: ${normalize(35)}px;
`;

export const Container = styled.View`
  padding: 7% 20px 0px 20px;
`;

export const About = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${normalize(18)}px;
  text-align: left;
  padding: ${normalize(8)}px;
`;

export const ConfirmButton = styled(Btn)`
  margin-top: ${normalize(12)}px;
`;
