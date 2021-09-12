import styled from 'styled-components/native';
import theme from 'theme/theme';

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
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  color: ${theme.colors.white}
  font-size: ${theme.font.sizes.X};
  line-height: 35px;
`;

export const InputText = styled.Text`
  color: ${theme.colors.primary};
  padding-bottom: 3%;
`;

export const TextBtn = styled.Text`
  color: rgba(145, 52, 38, 0.6);
  padding-top: 5%;
  padding-right: 20px;
  text-align: right;
`;

export const FirstInput = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InputView = styled.View`
  flex: 1;
`;
