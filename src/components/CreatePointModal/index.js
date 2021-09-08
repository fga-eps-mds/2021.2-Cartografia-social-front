import React, {useRef, useMemo} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import {Text, Btn} from 'components/UI';
import theme from 'theme/theme';

import {Container, Option} from './styles';

const CreatePoint = ({locationSelected}) => {
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const sheetRef = useRef(null);

  const onSave = () => {
    return locationSelected;
  };

  return (
    <>
      <Container>
        <Option size={50} onPress={() => sheetRef.current.snapToIndex(0)}>
          <Text color={theme.colors.white}>Teste</Text>
        </Option>
      </Container>
      <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetScrollView>
          <Text>Teste</Text>
          <Btn onPress={onSave} title="Salvar ponto" />
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

CreatePoint.propTypes = {
  locationSelected: PropTypes.shape({
    latitude: PropTypes.string,
    longitude: PropTypes.func,
  }),
};

CreatePoint.defaultProps = {
  locationSelected: {},
};

export default CreatePoint;
