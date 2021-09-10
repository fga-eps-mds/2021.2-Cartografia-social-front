import styled from 'styled-components/native';
import logo from 'assets/logo.png';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'contain',
})`
  width: 200px;
  height: 200px;
  align-self: center;
  margin-bottom: 40px;
`;
