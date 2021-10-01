import styled from 'styled-components/native';
import {Platform} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import theme from 'theme/theme';

export const Icon = styled(FontAwesomeIcon).attrs((props) => ({
  color: props.color ? props.color : theme.colors.black,
}))``;

export const Container = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -15px;
  margin-top: ${Platform.OS === 'ios' ? '-28px' : '-43px'};
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

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 7px;
  margin-right: 10px;
`;

export const MidiaContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 7px;
  margin-right: 10px;
  background-color: #b8cad4;
  align-items: center;
  justify-content: space-around;
`;
