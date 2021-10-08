import styled from 'styled-components/native';
import theme from 'theme/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Header = styled.View`
  width: 100%;
  height: 10%;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Media = styled.View`
  width: 100%;
  height: 70%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Text = styled.Text`
  font-weight: bold;
  font-size: ${(props) => props.fontSize};
  color: ${theme.colors.primary};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  margin-right: 10px;
`;

export const Audio = styled.View`
  width: 100%;
  height: 50%;
  border-radius: 7px;
  margin-right: 10px;
  align-items: center;
`;

export const OptionsButton = styled.View`
  width: 100%;
  height: 15%;
  border-radius: 7px;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Icon = styled(FontAwesomeIcon).attrs((props) => ({
  color: props.color ? props.color : theme.colors.black,
}))``;

export const AudioContainer = styled.View`
  width: 100%;
  height: 30%;
  border-radius: 7px;
  border-width: 0.5px;
  align-items: center;
  flex-direction: row;
  padding: 15px;
`;
