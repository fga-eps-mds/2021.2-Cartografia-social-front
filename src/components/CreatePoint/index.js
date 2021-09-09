import React, {useRef, useMemo, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import {Btn, Input, View} from 'components/UI';
import required from 'validators/required';

import {Container, Icon} from './styles';

const CreatePoint = ({locationSelected, show, onClose}) => {
  const snapPoints = useMemo(() => [110, '50%', '95%'], []);
  const sheetRef = useRef(null);

  const DEFAULT_STATE = {
    isValid: false,
    value: '',
  }

  const [title, setTitle] = useState(DEFAULT_STATE);

  const [description, setDescription] = useState(DEFAULT_STATE);

  const onSave = () => {
    sheetRef.current.close();

    setTimeout(() => {
      onClose();
      setTitle(DEFAULT_STATE);
      setDescription(DEFAULT_STATE);
    }, 1000);
    return locationSelected;
  };

  const pointName = () => (
    <View mt={2}>
      <Input
        label="Digite aqui o título do novo ponto"
        onChange={(value) => setTitle(value)}
        value={title.value}
        autoCapitalize="words"
        onFocus={() => sheetRef.current.snapToIndex(2)}
        rules={[required]}
      />
    </View>
  );

  const formIsValid = () => {
    return title.isValid;
  };

  if (show) {
    return (
      <>
        <Container>
          <Icon size={40} title="map-marker-alt" />
        </Container>
        <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints}>
          <BottomSheetScrollView keyboardShouldPersistTaps="handled">
            <View px={3}>
              {pointName()}
              <View py={3}>
                <Input
                  height={100}
                  characterRestriction={5000}
                  maxLength={5000}
                  label="Digite aqui a descrição do novo ponto"
                  onChange={(value) => setDescription(value)}
                  value={description.value}
                  multiline
                />
              </View>
              <Btn
                onPress={onSave}
                disabled={!formIsValid()}
                title="Salvar ponto"
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </>
    );
  }

  return null;
};

CreatePoint.propTypes = {
  locationSelected: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  show: PropTypes.bool,
};

CreatePoint.defaultProps = {
  locationSelected: {},
  show: false,
};

export default CreatePoint;
