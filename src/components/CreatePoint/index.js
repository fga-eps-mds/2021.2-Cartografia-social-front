import React, {useRef, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import {Btn, Input, View} from 'components/UI';
import required from 'validators/required';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import * as Actions from 'store/actions';
import api from 'services/api';
import {Container, Icon} from './styles';

const CreatePoint = ({locationSelected, show, onClose}) => {
  const dispatch = useDispatch();
  const user = useSelector(auth);
  const snapPoints = useMemo(() => [110, '50%', '95%'], []);
  const sheetRef = useRef(null);

  const DEFAULT_STATE = {
    isValid: false,
    value: '',
  };

  const [title, setTitle] = useState(DEFAULT_STATE);

  const [description, setDescription] = useState(DEFAULT_STATE);
  const [showMarker, setShowMarker] = useState(true);

  const onSave = async () => {
    setShowMarker(false);
    setTimeout(() => {
      setShowMarker(true);
    }, 2000);
    const newMarker = {
      latitude: locationSelected.latitude,
      longitude: locationSelected.longitude,
      title: title.value,
      description: description.value,
    };

    dispatch(Actions.createMarker(newMarker));
    if (user && user.id) {
      try {
        await api.post('/maps/point', newMarker);
      } catch (error) {
        Alert.alert('Cartografia Social', error.message);
      }
    }
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
          {showMarker ? <Icon size={40} name="map-marker-alt" /> : null}
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
  onClose: PropTypes.func,
};

CreatePoint.defaultProps = {
  locationSelected: {},
  show: false,
  onClose: () => {},
};

export default CreatePoint;
