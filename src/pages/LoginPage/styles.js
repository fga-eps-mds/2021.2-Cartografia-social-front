import styled from 'styled-components/native';
import theme from 'theme/theme';

export const Container = styled.View`
  padding: 20px;
`;

export const Header = styled.View`
  width: auto;
  height: 30%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: ${theme.colors.primary};
`;

export const HeadeText = styled.Text`
  position: absolute;
  bottom: 10%;
  left: 5%;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  color: ${theme.colors.white}
  font-size: ${theme.font.sizes.X};
  line-height: 35px;
`;

export const FirstInput = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InputView = styled.View`
  flex: 1;
`;
