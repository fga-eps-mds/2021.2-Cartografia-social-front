import styled from 'styled-components/native';
import theme from 'theme/theme';
import normalize from 'react-native-normalize';
import Btn from 'components/UI/Btn';

export const About = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${normalize(18)}px;
  text-align: left;
  padding: 0 ${normalize(8)}px ${normalize(16)}px ${normalize(8)}px;
`;

export const ConfirmButton = styled(Btn)`
  margin-top: ${normalize(12)}px;
`;

export const Container = styled.View`
  padding: 15% 20px 0px 20px;
`;

export const Header = styled.View`
  width: auto;
  height: 20%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: ${theme.colors.primary};
`;

export const HeaderText = styled.Text`
  position: absolute;
  bottom: 20%;
  left: 5%;
  font-style: normal;
  font-weight: bold;
  color: ${theme.colors.white}
  font-size: ${theme.font.sizes.X};
  line-height: 35px;
`;
