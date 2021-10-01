import styled from 'styled-components/native';
import theme from 'theme/theme';

export const Container = styled.View`
  width: 100%;
  height: 30%;
  background-color: #fff;
  justify-content: space-between;
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

export const OptionsButton = styled.View`
  width: 100%;
  height: 80%;
  border-radius: 7px;
  /* background-color: #0f0; */
  justify-content: space-evenly;
  flex-direction: column;
`;
