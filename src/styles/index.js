import styled from 'styled-components/native';
import normalize from 'react-native-normalize';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import theme from 'theme/theme';

export const Icon = styled(FontAwesomeIcon).attrs((props) => ({
  color: props.color ? props.color : theme.colors.black,
}))``;

export const MediaButton = styled.TouchableOpacity`
  width: 100%;
  height: 70%;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
`;

export const MediaContainer = styled.View`
  width: ${({bigger}) => (bigger ? normalize(100) : normalize(150))};
  height: ${({bigger}) => (bigger ? normalize(125) : normalize(200))};
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  align-items: center;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 30%;
  height: 30%;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;
