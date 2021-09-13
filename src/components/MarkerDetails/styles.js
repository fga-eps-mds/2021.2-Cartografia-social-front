import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import theme from 'theme/theme';

export const Icon = styled(FontAwesomeIcon).attrs({
  color: theme.colors.white,
})``;

export const Image = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 7px;
`;
