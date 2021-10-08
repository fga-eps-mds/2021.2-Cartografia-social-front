import React, {useRef, useMemo, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
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
import instance from 'services/api2';
import useDocumentPicker from 'services/useDocumentPicker';
import FormData from 'form-data';
import RecordAudioModalContent from 'components/RecordAudioModalContent';
import SelectModal from 'components/SelectModal';
import ShowMediaModal from 'components/ShowMediaModal';
import normalize from 'react-native-normalize';
import MediaModalContent from 'components/MediaModalContent';
import ImageView from 'react-native-image-viewing';
import UseCamera from '../../services/useCamera';

import {
  Container,
  Icon,
  Image,
  AudioContainer,
  ImageBackground,
  MediaButton,
  MediaContainer,
  DeleteButton,
} from './styles';

const CreatePoint = ({locationSelected, show, onClose, isCreatingArea}) => {
  UseCamera();
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
  const [audioCount, setAudioCount] = useState(0);
  const [medias, setMedias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCamVisible, setModalCamVisible] = useState(false);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [modalShowMediaVisible, setModalShowMediaVisible] = useState(false);
  const [mediaShowed, setMediaShowed] = useState({});
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const selectPdf = async () => {
    const results = await useDocumentPicker();

    if (results) {
      const formattedResults = results.map((item) => ({
        uri: item.uri,
        fileName: item.name,
        type: item.type,
      }));

      setMedias([...medias, ...formattedResults]);
    }
  };

  const actions = [
    {
      icon: 'file-pdf',
      onPress: () => selectPdf(),
    },
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
      onPress: () => {
        setModalMediaVisible(true);
      },
    },
  ];

  const onCloseBottomSheet = () => {
    onClose();
    setTitle(DEFAULT_STATE);
    setDescription(DEFAULT_STATE);
    setMedias([]);
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
        multimedia: medias,
      };
      dispatch(Actions.resetNewArea());
    } else {
      newMarker = {
        latitude: locationSelected.latitude,
        longitude: locationSelected.longitude,
        title: title.value,
        description: description.value,
        multimedia: medias,
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

  const toggleCamModal = () => {
    setModalCamVisible(!modalCamVisible);
  };

  const toggleMediaModal = () => {
    setModalMediaVisible(!modalMediaVisible);
  };

  const closeShowMediaModal = () => {
    setMediaShowed({});
    setModalShowMediaVisible(false);
  };

  const handleShowMedia = (fileType, fileUri, fileDuration) => {
    const media = {
      type: fileType,
      uri: fileUri,
      duration: fileDuration,
    };
    setMediaShowed(media);
  };

  const setMediasList = (newMedia) => {
    setMedias([...medias, ...newMedia]);
  };

  const getTime = (time) => {
    return new Date(time).toISOString().slice(11, -1);
  };

  const filterImages = (media) => {
    return media.type === 'image/jpeg';
  };

  const DeleteMedia = (mediaPath) => {
    const newMediasList = medias.filter((media) => media.uri !== mediaPath);

    setMedias(newMediasList);
  };

  useEffect(() => {
    if (Object.keys(mediaShowed).length !== 0) {
      setModalShowMediaVisible(true);
    }
  }, [mediaShowed]);

  const renderItem = ({item, index}) => {
    if (item.type === 'image/jpeg') {
      return (
        <MediaContainer>
          <MediaButton
            onPress={() => {
              setImageIndex(index);
              setIsVisibleImageModal(true);
            }}>
            <Image source={{uri: item.uri}} />
          </MediaButton>
          <DeleteButton onPress={() => DeleteMedia(item.uri)}>
            <Icon size={normalize(20)} name="trash" color="#FF0000" />
          </DeleteButton>
        </MediaContainer>
      );
    }

    if (item.type === 'audio/mpeg') {
      return (
        <MediaContainer>
          <MediaButton
            onPress={() => handleShowMedia(item.type, item.uri, item.duration)}>
            <AudioContainer>
              <Icon size={normalize(20)} name="microphone" color="#2a3c46" />
              <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>
                {getTime(item.duration).split('.')[0]}
              </Text>
            </AudioContainer>
          </MediaButton>
          <DeleteButton onPress={() => DeleteMedia(item.uri)}>
            <Icon size={normalize(20)} name="trash" color="#FF0000" />
          </DeleteButton>
        </MediaContainer>
      );
    }

    if (item.type === 'application/pdf') {
      return (
        <MidiaContainer>
          <Icon size={normalize(40)} name="file-pdf" color="#2a3c46" />
          <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>PDF</Text>
          <Text
            numberOfLines={1}
            style={{fontSize: normalize(15), color: '#2a3c46'}}>
            {item.fileName}
          </Text>
        </MidiaContainer>
      );
    }

    return (
      <MediaButton onPress={() => handleShowMedia(item.type, item.uri)}>
        <ImageBackground
          source={{uri: item.thumb}}
          imageStyle={{borderRadius: 7}}
        />
        <Icon size={normalize(20)} name="play" color={theme.colors.primary} />
      </MediaButton>
    );
  };

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
              {medias.length ? (
                <View>
                  <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
                    Multimídia
                  </Text>
                  <FlatList
                    mb={1}
                    data={medias}
                    horizontal
                    keyExtractor={(item) => item.uri}
                    renderItem={renderItem}
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
          <Modal
            isVisible={modalMediaVisible}
            onSwipeComplete={toggleMediaModal}
            swipeDirection={['down']}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <MediaModalContent
              toggleModal={toggleMediaModal}
              setMedias={setMediasList}
            />
          </Modal>
          <Modal
            isVisible={modalShowMediaVisible}
            onSwipeComplete={closeShowMediaModal}
            swipeDirection={['down']}
            style={{justifyContent: 'center', margin: 0}}>
            <ShowMediaModal
              media={mediaShowed}
              closeModal={closeShowMediaModal}
            />
          </Modal>
          <ImageView
            images={medias.filter(filterImages)}
            imageIndex={imageIndex}
            visible={visibleImageModal}
            onRequestClose={() => setIsVisibleImageModal(false)}
          />
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
