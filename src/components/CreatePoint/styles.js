import styled from 'styled-components/native';
import {Platform} from 'react-native';
import normalize from 'react-native-normalize';
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
  width: 100%;
  height: 100%;
  border-radius: 7px;
`;

export const AudioContainer = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #b8cad4;
  align-items: center;
  justify-content: space-around;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  margin-left: 5px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;

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
  width: ${normalize(100)};
  height: ${normalize(125)};
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  align-items: center;
  /* background-color: #00F; */
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 30%;
  height: 30%;
  border-radius: 7px;
  justify-content: center;
  /* background-color: #000; */
  align-items: center;
`;
