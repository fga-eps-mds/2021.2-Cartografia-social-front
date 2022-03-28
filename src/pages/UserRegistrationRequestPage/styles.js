import styled from 'styled-components/native';
import theme from 'theme/theme';
import normalize from 'react-native-normalize';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

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

export const Text = styled.Text`
  color: ${theme.colors.primary};
  padding-bottom: 3%;
  font-size: ${theme.font.sizes.L};
`;
