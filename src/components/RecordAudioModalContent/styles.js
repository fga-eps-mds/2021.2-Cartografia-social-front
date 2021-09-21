import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import theme from 'theme/theme';

export const Container = styled.View`
  width: 100%;
  height: 60%;
  background-color: #FFF;
  justify-content: space-evenly;
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
})``;

export const AudioContainer = styled.View`
  width: 100%;
  height: 17%;
  border-radius: 7px;
  border-width: .5px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;

export const ManageRecordButtons = styled.View`
  width: 100%;
  height: 20%;
  border-radius: 7px;
  background-color: #00F;
`;

export const OptionsButton = styled.View`
  width: 100%;
  height: 20%;
  border-radius: 7px;
  background-color: #0F0;
  justify-content: space-evenly;
`;
