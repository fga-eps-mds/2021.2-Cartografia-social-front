import styled from 'styled-components/native';
import theme from 'theme/theme';
import {space, typography, flexbox} from 'styled-system';

export default styled.Text`
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : theme.font.sizes.M}px;
  color: ${(props) => (props.color ? props.color : theme.colors.black)};
  ${space};
  ${typography};
  ${flexbox};
`;
