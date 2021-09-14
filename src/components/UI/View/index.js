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

export default styled.View`
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  ${color}
  ${space};
  ${layout};
  ${flexbox};
  ${border};
  ${position};
  ${shadow};
`;
