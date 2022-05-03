import styled from 'styled-components/native';
import logo from 'assets/nortear_cartografias.jpg';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  width: 100%;
  max-height: 40%;
  align-self: center;
`;
