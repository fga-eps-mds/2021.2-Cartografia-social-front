import styled from 'styled-components/native';
import theme from 'theme/theme';
import normalize from 'react-native-normalize';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export const Main = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  padding: 7% 20px 0px 20px;
`;

export const InputText = styled.Text`
  color: ${theme.colors.primary};
  padding-bottom: 3%;
`;

export const PickerContainer = styled.TouchableOpacity`
  width: ${normalize(340)}px;
  height: ${normalize(55)}px;
  border-radius: 7px;
  border-width: 1px;
  border-color: #a3a3a3;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
`;

export const PickerText = styled.Text`
  font-size: ${normalize(16.5)}px;
  color: ${(props) => (props.selected ? '#000' : '#a3a3a3')};
  padding-bottom: 3%;
  margin-top: 10px;
`;

export const Icon = styled(FontAwesomeIcon).attrs((props) => ({
  color: props.color ? props.color : theme.colors.black,
}))``;
