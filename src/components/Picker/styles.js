import styled from 'styled-components/native';
import theme from 'theme/theme';
import normalize from 'react-native-normalize';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export const ModalContainerButton = styled.TouchableOpacity`
  flex: 1;
`;

export const EmptyArea = styled.TouchableOpacity`
  border-radius: 10px;
  width: 100%;
  height: 0%;
`;

export const ModalContainer = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 12px;
  justify-content: space-between;
`;

export const FlatListView = styled.View`
  flex: 1;
  /* background-color: #F00; */
`;

export const SearchBox = styled.View`
  /* flex: .2; */
  /* justify-content: center; */
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  height: ${normalize(65)};
  /* background-color: #00F; */
`;

export const UserItem = styled.TouchableOpacity`
  height: ${normalize(60)};
  border-top-width: 1px;
  border-top-color: #a3a3a3;
  align-items: center;
  flex-direction: row;
`;

export const TitleText = styled.Text`
  font-size: ${normalize(20)};
`;

export const SearchText = styled.Text`
  font-size: ${normalize(15)};
  color: #a3a3a3;
`;

export const ItemText = styled.Text`
  font-size: ${normalize(15)};
  margin-left: 10px;
`;

export const Icon = styled(FontAwesomeIcon).attrs((props) => ({
  color: props.color ? props.color : theme.colors.black,
}))`
  margin-left: 10px;
`;

export const MessageText = styled.Text`
  font-size: ${normalize(18)};
  margin-left: 10px;
  margin 
`;
