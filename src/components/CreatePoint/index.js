import React, {useRef, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import {launchImageLibrary} from 'react-native-image-picker';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import {Btn, Input, View, FlatList, Text} from 'components/UI';
import required from 'validators/required';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import * as Actions from 'store/actions';
import api from 'services/api';
import Fabs from 'components/Fabs';
import theme from 'theme/theme';
import instance from 'services/api2';
import FormData from 'form-data';
import RecordAudioModalContent from 'components/RecordAudioModalContent';
import SelectModal from 'components/SelectModal';
import normalize from 'react-native-normalize';
import UseCamera from '../../services/useCamera';
import {Container, Icon, Image, MidiaContainer} from './styles';

const CreatePoint = ({locationSelected, show, onClose}) => {
  UseCamera();
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
  const [audioCount, setAudioCount] = useState(0);
  const [medias, setMedias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCamVisible, setModalCamVisible] = useState(false);

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
      setMedias([...medias, ...response.assets]);
    }
  };

  const actions = [
    {
      icon: 'microphone',
      onPress: () => setModalVisible(true),
    },
    {
      icon: 'camera',
      onPress: () => {
        setModalCamVisible(true);
      },
    },
    {
      icon: 'paperclip',
      onPress: () => launchImageLibrary(cameraOptions, onSelectImage),
    },
  ];

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
      multimedia: medias,
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

    medias.map(async (media) => {
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: media.uri,
          type: media.type,
          name: media.fileName,
        });
        await instance.post('midia/uploadMidia', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        Alert.alert('erro ao salvar áudio: ', media.fileName);
      }
    });

    setTimeout(() => {
      onClose();
      setTitle(DEFAULT_STATE);
      setDescription(DEFAULT_STATE);
      setMedias([]);
    }, 1000);
    return locationSelected;
  };

  const pointName = () => (
    <View my={2}>
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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleCamModal = () => {
    setModalCamVisible(!modalCamVisible);
  };

  const setMediasList = (newMedia) => {
    setMedias([...medias, ...newMedia]);
  };

  const getTime = (time) => {
    return new Date(time).toISOString().slice(11, -1);
  };

  const renderItem = ({item}) => {
    if (item.type === 'image/jpeg') {
      return <Image source={{uri: item.uri}} />;
    }
    if (item.type === 'audio/mpeg') {
      return (
        <MidiaContainer>
          <Icon size={normalize(40)} name="microphone" color="#2a3c46" />
          <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>Áudio</Text>
          <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>
            {getTime(item.duration).split('.')[0]}
          </Text>
        </MidiaContainer>
      );
    }
    return (
      <MidiaContainer>
        <Icon size={normalize(40)} name="camera" color="#2a3c46" />
        <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>Vídeo</Text>
        <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>
          {getTime(item.duration * 1000).split('.')[0]}
        </Text>
      </MidiaContainer>
    );
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
              {medias.length ? (
                <View>
                  <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
                    Multimídia
                  </Text>
                  <FlatList
                    mb={3}
                    data={medias}
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
          <Fabs actions={actions} />
        </BottomSheet>
        <View>
          <Modal
            isVisible={modalVisible}
            onSwipeComplete={toggleModal}
            swipeDirection={['down']}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <RecordAudioModalContent
              toggleModal={toggleModal}
              setMedias={setMediasList}
              value={audioCount + 1}
              setAudioCount={() => setAudioCount(audioCount + 1)}
            />
          </Modal>
          <Modal
            isVisible={modalCamVisible}
            onSwipeComplete={toggleCamModal}
            swipeDirection={['down']}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <SelectModal
              toggleModal={toggleCamModal}
              setMedias={setMediasList}
            />
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
};

CreatePoint.defaultProps = {
  locationSelected: {},
  show: false,
  onClose: () => {},
};

export default CreatePoint;
