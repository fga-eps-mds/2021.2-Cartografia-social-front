import styled from 'styled-components/native';

import {
  space,
  color,
  shadow,
  layout,
  flexbox,
  border,
  position,
} from 'styled-system';
import theme from 'theme/theme';

export default styled.View`
  height: 1px;
  background-color: ${theme.colors.grey};
  align-self: stretch;
  ${color}
  ${space};
  ${layout};
  ${flexbox};
  ${border};
  ${position};
  ${shadow};
`;
