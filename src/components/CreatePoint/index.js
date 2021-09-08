import React, {useRef, useMemo, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import {Text, Btn, Input, View} from 'components/UI';
import theme from 'theme/theme';
import required from 'validators/required';

import {Container, Icon} from './styles';

const CreatePoint = ({locationSelected, show, onClose}) => {
  const snapPoints = useMemo(() => ['12%', '50%', '95%'], []);
  const sheetRef = useRef(null);

  const [name, setName] = useState({
    isValid: false,
    value: '',
  });

  const [description, setDescription] = useState({
    isValid: false,
    value: '',
  });

  const onSave = () => {
    sheetRef.current.close();
    setTimeout(() => {
      onClose();
    }, 1000);
    return locationSelected;
  };

  const pointName = () => (
    <View p={3}>
      <Input
        label="Digite aqui o nome do novo ponto"
        onChange={(value) => setName(value)}
        value={name.value}
        autoCapitalize="words"
        onFocus={() => sheetRef.current.snapToIndex(2)}
        rules={[required]}
      />
    </View>
  );

  if (show) {
    return (
      <>
        <Container>
          <Icon size={40} name="map-marker-alt" />
        </Container>
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          handleComponent={pointName}>
          <BottomSheetScrollView>
            <View px={3}>
              <View py={3}>
                <Input
                  label="Digite aqui a descrição do novo ponto"
                  onChange={(value) => setDescription(value)}
                  value={description.value}
                  multiline
                />
              </View>
              <Btn onPress={onSave} title="Salvar ponto" />
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
    latitude: PropTypes.string,
    longitude: PropTypes.func,
  }),
  show: PropTypes.bool,
};

CreatePoint.defaultProps = {
  locationSelected: {},
  show: false,
};

export default CreatePoint;
