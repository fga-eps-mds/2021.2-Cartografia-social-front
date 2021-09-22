import React, {useRef, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import {Btn, Input, View, FlatList, Text} from 'components/UI';
import required from 'validators/required';
import {useDispatch, useSelector} from 'react-redux';
import {auth, newArea} from 'store/selectors';
import * as Actions from 'store/actions';
import api from 'services/api';
import Fabs from 'components/Fabs';
import theme from 'theme/theme';
import RecordAudioModalContent from 'components/RecordAudioModalContent';
import {Container, Icon, Image} from './styles';

const CreatePoint = ({locationSelected, show, onClose, isCreatingArea}) => {
  const dispatch = useDispatch();
  const user = useSelector(auth);
  const area = useSelector(newArea);
  const snapPoints = useMemo(() => [110, '50%', '95%'], []);
  const sheetRef = useRef(null);

  let namePlaceholder = 'Digite aqui o título do novo ponto';
  let descriptionPlaceholder = 'Digite aqui a descrição do novo ponto';
  let buttonName = 'Salvar ponto';

  if (isCreatingArea) {
    namePlaceholder = 'Digite aqui o título da nova área';
    descriptionPlaceholder = 'Digite aqui a descrição da nova área';
    buttonName = 'Salvar área';
  }

  const DEFAULT_STATE = {
    isValid: false,
    value: '',
  };

  const [title, setTitle] = useState(DEFAULT_STATE);

  const [description, setDescription] = useState(DEFAULT_STATE);
  const [showMarker, setShowMarker] = useState(true);
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const cameraOptions = {
    mediaType: 'photo',
    maxWidth: 1300,
    maxHeight: 1300,
    quality: 0.9,
    saveToPhotos: true,
    selectionLimit: 0,
  };

  const onSelectImage = (response) => {
    if (response.assets && response.assets.length) {
      setImages([...images, ...response.assets]);
    }
  };

  const actions = [
    {
      icon: 'microphone',
      onPress: () => setModalVisible(true),
    },
    {
      icon: 'camera',
      onPress: () => launchCamera(cameraOptions, onSelectImage),
    },
    {
      icon: 'paperclip',
      onPress: () => launchImageLibrary(cameraOptions, onSelectImage),
    },
  ];

  const onCloseBottomSheet = () => {
    onClose();
    setTitle(DEFAULT_STATE);
    setDescription(DEFAULT_STATE);
    setImages([]);
  };

  const onSave = async () => {
    setShowMarker(false);
    setTimeout(() => {
      setShowMarker(true);
    }, 2000);

    let newMarker;

    if (isCreatingArea) {
      newMarker = {
        coordinates: area.coordinates,
        title: title.value,
        description: description.value,
        multimedia: images,
      };
      dispatch(Actions.resetNewArea());
    } else {
      newMarker = {
        latitude: locationSelected.latitude,
        longitude: locationSelected.longitude,
        title: title.value,
        description: description.value,
        multimedia: images,
      };
    }

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
      onCloseBottomSheet();
    }, 1000);
    return locationSelected;
  };

  const pointName = () => (
    <View my={2}>
      <Input
        label={namePlaceholder}
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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = ({item}) => <Image source={{uri: item.uri}} />;

  if (show || isCreatingArea) {
    return (
      <>
        <Container>
          {showMarker && !isCreatingArea ? (
            <Icon size={40} name="map-marker-alt" />
          ) : null}
        </Container>
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          onClose={onCloseBottomSheet}
          enablePanDownToClose>
          <BottomSheetScrollView keyboardShouldPersistTaps="handled">
            <View px={3}>
              {pointName()}
              {images.length ? (
                <View>
                  <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
                    Multimídia
                  </Text>
                  <FlatList
                    data={images}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uri}
                  />
                </View>
              ) : null}
              <View>
                <Input
                  height={100}
                  characterRestriction={5000}
                  maxLength={5000}
                  label={descriptionPlaceholder}
                  onChange={(value) => setDescription(value)}
                  value={description.value}
                  multiline
                />
              </View>
              <Btn
                onPress={onSave}
                disabled={!formIsValid()}
                title={buttonName}
              />
            </View>
          </BottomSheetScrollView>
          <Fabs actions={actions} />
        </BottomSheet>
        <View>
          <Modal
            isVisible={modalVisible}
            onSwipeComplete={toggleModal}
            swipeDirection={['down']}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <RecordAudioModalContent toggleModal={toggleModal} />
          </Modal>
        </View>
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
  isCreatingArea: PropTypes.bool,
};

CreatePoint.defaultProps = {
  locationSelected: {},
  show: false,
  onClose: () => {},
  isCreatingArea: false,
};

export default CreatePoint;
