import styled from 'styled-components/native';
import theme from 'theme/theme';
import marcacaoDeAreaCorreta from 'assets/MarcacaoDeAreaCorreta.gif';
import marcacaoDeAreaIncorreta from 'assets/MarcacaoDeAreaIncorreta.gif';

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
  height: 10%;
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

export const MarcacaoDeAreaCorreta = styled.Image.attrs({
  source: marcacaoDeAreaCorreta,
  resizeMode: 'contain',
})`
  width: 150px;
  height: 150px;
  align-self: center;
  margin-bottom: 40px;
  margin-right: 10px;
`;

export const MarcacaoDeAreaIncorreta = styled.Image.attrs({
  source: marcacaoDeAreaIncorreta,
  resizeMode: 'contain',
})`
  width: 150px;
  height: 150px;
  align-self: center;
  margin-bottom: 40px;
`;
