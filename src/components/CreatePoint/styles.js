import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import theme from 'theme/theme';

export const Icon = styled(FontAwesomeIcon).attrs({
  color: theme.colors.black,
})``;

export const Container = styled.View`
  position: absolute;
  top: 50%;
  left: 47%;
  align-items: center;
  justify-content: center;
`;

export const Option = styled.TouchableHighlight.attrs({
  underlayColor: theme.colors.secondary,
})`
  border-radius: 100px;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin: 5px;
`;
