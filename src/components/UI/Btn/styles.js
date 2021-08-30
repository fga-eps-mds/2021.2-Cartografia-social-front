import styled from 'styled-components/native';
import theme from 'theme/theme';
import Touchable from 'components/UI/Touchable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ButtonStyle = styled(Touchable)`
  background: ${(props) =>
    props.showDisabled ? theme.colors.grey : props.background};
  border-radius: 7px;
  width: 100%;
  height: ${(props) => props.height}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
`;

export const ButtonText = styled.Text`
  color: ${(props) => (props.showDisabled ? theme.colors.grey : props.color)};
  font-size: ${(props) => props.fontSize};
  font-family: ${theme.font.family};
  letter-spacing: 1px;
  text-align: center;
  font-family: 'Helvetica';
  font-weight: ${(props) => props.fontWeight};
`;

export const Icon = styled(MaterialIcons).attrs({
  size: 25,
})`
  margin-right: 10px;
`;
