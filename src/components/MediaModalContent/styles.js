import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import theme from 'theme/theme';

export const Container = styled.View`
  width: 100%;
  height: 40%;
  background-color: #fff;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Header = styled.View`
  width: 100%;
  height: 15%;
  border-radius: 7px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${(props) => props.fontSize};
  color: ${theme.colors.primary};
`;

export const Icon = styled(FontAwesomeIcon).attrs({
  color: theme.colors.primary,
  size: 26,
})``;

export const Column = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
