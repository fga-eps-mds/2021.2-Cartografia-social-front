import React, {useRef, useMemo, useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
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
import {saveArea, savePoint} from 'services/offlineMapService';
import Fabs from 'components/Fabs';
import theme from 'theme/theme';
import useDocumentPicker from 'services/useDocumentPicker';
import FormData from 'form-data';
import RecordAudioModalContent from 'components/RecordAudioModalContent';
import SelectModal from 'components/SelectModal';
import ShowMediaModal from 'components/ShowMediaModal';
import MediaModalContent from 'components/MediaModalContent';
import ImageView from 'react-native-image-viewing';
import UseCamera from '../../services/useCamera';
import ImagePreview from '../ImagePreview';
import AudioPreview from '../AudioPreview';
import DocumentPreview from '../DocumentPreview';
import VideoPreview from '../VideoPreview';

import {Container, Icon} from './styles';

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
  let confirmacao = 'Deseja salvar o ponto?';
  if (isCreatingArea) {
    namePlaceholder = 'Digite aqui o título da nova área';
    descriptionPlaceholder = 'Digite aqui a descrição da nova área';
    buttonName = 'Salvar área';
    confirmacao = 'Deseja salvar a área?';
  }

  const DEFAULT_STATE = {
    isValid: false,
    value: '',
  };

  function isNumeric(str) {
    if (typeof str === 'number') return true;
    return (
      !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !Number.isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  const [title, setTitle] = useState(DEFAULT_STATE);
  const [description, setDescription] = useState(DEFAULT_STATE);
  const [latitude, setLatitude] = useState(DEFAULT_STATE);
  const [longitude, setLongitude] = useState(DEFAULT_STATE);
  const [showMarker, setShowMarker] = useState(true);
  const [audioCount, setAudioCount] = useState(0);
  const [medias, setMedias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCamVisible, setModalCamVisible] = useState(false);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [modalShowMediaVisible, setModalShowMediaVisible] = useState(false);
  const [mediaShowed, setMediaShowed] = useState({});
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [openedImage, setOpenedImage] = useState({});
  const netInfo = NetInfo.useNetInfo();

  const selectPdf = async () => {
    let results = await useDocumentPicker();
    const filesBiggerThanSupported = [];
    results = results.filter((result) => {
      if (result.size < 10485760) {
        return 1;
      }
      filesBiggerThanSupported.push(result);
      return 0;
    });
    if (filesBiggerThanSupported.length > 0) {
      let text = `${filesBiggerThanSupported.length} arquivo(s) excede(m) o tamanho máximo permitido de 10MB e portanto não pode(m) ser adicionado(s).\n\n`;
      filesBiggerThanSupported.forEach((file) => {
        text += `${file.name}\n`;
      });
      Alert.alert('Atenção!', text);
    }
    if (results) {
      const formattedResults = results.map((item) => {
        return {
          uri: item.uri,
          fileName: item.name,
          type: item.type,
        };
      });

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

  const onConfirmation = () => {
    const continuar = true;
    Alert.alert('Atenção', confirmacao, [
      {
        text: 'Cancelar',
        continuar: false,
        onPress: () => Alert.alert('Atenção', 'Marcação cancelada'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => Alert.alert('Atenção', 'Marcação concluída'),
        style: 'cancel',
      },
    ]);
    return continuar;
  };

  const onSave = async () => {
    const locationId = null;
    setShowMarker(false);
    setTimeout(() => {
      setShowMarker(true);
    }, 2000);
    let newMarker;

    if (isCreatingArea) {
      if (area.coordinates.length < 3) {
        Alert.alert('Atenção!', 'É Necessário marcar um polígono no mapa!');
        return;
      }
      if (onConfirmation()) {
        newMarker = {
          coordinates: area.coordinates,
          title: title.value,
          description: description.value,
          multimedia: medias,
          id: locationId,
          validated: false,
          member: user.data.id,
        };
        dispatch(Actions.resetNewArea());
      }
    } else if (isNumeric(latitude.value) && isNumeric(longitude.value)) {
      if (onConfirmation()) {
        newMarker = {
          latitude: parseFloat(latitude.value),
          longitude: parseFloat(longitude.value),
          title: title.value,
          description: description.value,
          multimedia: medias,
          id: locationId,
          validated: false,
          member: user.data.id,
        };
      }
    } else {
      Alert.alert('Atenção!', 'Digite corretamente as coordenadas!');
      return;
    }

    const {isInternetReachable} = netInfo;
    if (user && user.id) {
      try {
        if (isCreatingArea) {
          const response = await saveArea(
            newMarker,
            user.email,
            !isInternetReachable,
          );
          newMarker.id = response.id;
        } else {
          const response = await savePoint(
            newMarker,
            user.email,
            !isInternetReachable,
          );
          newMarker.id = response.id;
        }
      } catch (error) {
        Alert.alert(
          `Erro ao salvar ${isCreatingArea ? 'a area' : 'o ponto'}`,
          error.Message,
        );
      }
    }

    if (isInternetReachable) {
      medias.map(async (media) => {
        let mediaId = '';

        const formData = new FormData();
        formData.append('file', {
          uri: media.uri,
          type: media.type,
          name: media.fileName,
        });

        await api
          .post('midia/uploadMidia', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            mediaId = response.data;
          })
          .catch(() => {
            Alert.alert(
              'Tente mais tarde.',
              `Erro ao salvar arquivo '${media.fileName}'`,
            );
          });

        if (mediaId !== '') {
          const newMediaPoint = {
            locationId: locationId.id,
            mediaId: mediaId.public_id,
          };
          const endpoint = isCreatingArea
            ? '/maps/addMediaToArea'
            : '/maps/addMediaToPoint';
          await api.post(endpoint, newMediaPoint).catch(() => {
            Alert.alert(
              'Tente mais tarde.',
              `Erro ao adicionar midia à marcação: ${media.fileName}`,
            );
          });
        }
      });
    }
    dispatch(Actions.createMarker(newMarker));
    sheetRef.current.close();

    setTimeout(() => {
      onCloseBottomSheet();
    }, 1000);
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

  const DeleteMedia = (mediaPath) => {
    const newMediasList = medias.filter((media) => media !== mediaPath);

    setMedias(newMediasList);
  };

  useEffect(() => {
    if (Object.keys(mediaShowed).length !== 0) {
      setModalShowMediaVisible(true);
    }
  }, [mediaShowed]);

  useEffect(() => {
    setLatitude({
      value: locationSelected.latitude,
      isValid: true,
    });
    setLongitude({
      value: locationSelected.longitude,
      isValid: true,
    });
  }, [locationSelected]);

  const renderItem = ({item}) => {
    if (item.mediaType === 'image') {
      return (
        <ImagePreview
          item={item}
          setOpenedImage={setOpenedImage}
          setIsVisibleImageModal={setIsVisibleImageModal}
          DeleteMedia={DeleteMedia}
        />
      );
    }

    if (item.type === 'audio/mpeg') {
      return (
        <AudioPreview
          item={item}
          handleShowMedia={handleShowMedia}
          audioCount={audioCount}
          setAudioCount={setAudioCount}
          DeleteMedia={DeleteMedia}
        />
      );
    }

    if (item.type === 'application/pdf') {
      return (
        <DocumentPreview
          item={item}
          handleShowMedia={handleShowMedia}
          DeleteMedia={DeleteMedia}
        />
      );
    }

    return (
      <VideoPreview
        item={item}
        handleShowMedia={handleShowMedia}
        DeleteMedia={DeleteMedia}
      />
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
                style={{marginBottom: 20}}
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
            style={{justifyContent: 'center', margin: 0}}>
            <ShowMediaModal
              media={mediaShowed}
              closeModal={closeShowMediaModal}
            />
          </Modal>
          <ImageView
            images={[openedImage]}
            imageIndex={0}
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
