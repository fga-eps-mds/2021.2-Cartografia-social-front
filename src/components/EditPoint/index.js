import React, {useRef, useMemo, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
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

const EditPoint = ({marker, editHandler, locationSelected, show, onClose}) => {
  UseCamera();
  const dispatch = useDispatch();
  const user = useSelector(auth);
  // const area = useSelector(newArea);
  const snapPoints = useMemo(() => [110, '50%', '95%'], []);
  const sheetRef = useRef(null);

  let namePlaceholder = 'Digite aqui o título do novo ponto';
  let descriptionPlaceholder = 'Digite aqui a descrição do novo ponto';
  let buttonName = 'Salvar ponto';

  // if (isEditingArea) {
  //   namePlaceholder = 'Digite aqui o título da nova área';
  //   descriptionPlaceholder = 'Digite aqui a descrição da nova área';
  //   buttonName = 'Salvar área';
  // }

  const DEFAULT_TITLE_STATE = {
    isValid: true,
    value: marker.title,
  };

  const DEFAULT_DESCRIPTION_STATE = {
    isValid: true,
    value: marker.description,
  };

  const [title, setTitle] = useState(DEFAULT_TITLE_STATE);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION_STATE);
  const [showMarker, setShowMarker] = useState(true);
  const [audioCount, setAudioCount] = useState(0);
  const [medias, setMedias] = useState(marker.multimedia);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCamVisible, setModalCamVisible] = useState(false);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [modalShowMediaVisible, setModalShowMediaVisible] = useState(false);
  const [mediaShowed, setMediaShowed] = useState({});
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [openedImage, setOpenedImage] = useState({});

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

  // const onCloseBottomSheet = () => {
  //   onClose();
  //   setTitle(DEFAULT_STATE);
  //   setDescription(DEFAULT_STATE);
  //   setMedias([]);
  // };

  const onSave = async () => {
    var markerIndex = listMarkers.indexOf(marker);

    updatedMarker = {
      latitude: marker.latitude,
      longitude: marker.longitude,
      title: title.value,
      description: description.value,
      multimedia: medias,
      id: marker.id,
    }
    
    if (user && user.id) {
      await api
        .put('/maps/point', marker)
        .catch((error) => {
          Alert.alert('Cartografia Social', error.message);
        });
    }

    medias.map(async (media) => {
      let mediaId = '';

      const formData = new FormData();
      formData.append('file', {
        uri: media.uri,
        type: media.type,
        name: media.fileName,
      });

      await instance
        .post('midia/uploadMidia', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          mediaId = response.data;
        })
        .catch(() => {
          Alert.alert('erro ao salvar áudio: ', media.fileName);
        });
      
      const newMediaPoint = {
        locationId: marker.id,
        mediaId,
      };
      await api.post('/maps/addMediaToPoint', newMediaPoint).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    });

    
    dispatch(Actions.updateMarker(updatedMarker, markerIndex));
    editHandler(false);
    return updatedMarker;

    // // sheetRef.current.close();

    // setTimeout(() => {
    //   onCloseBottomSheet();
    // }, 1000);
    // return locationSelected;
  };

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
    const newMediasList = medias.filter((media) => media.uri !== mediaPath);

    setMedias(newMediasList);
  };

  useEffect(() => {
    if (Object.keys(mediaShowed).length !== 0) {
      setModalShowMediaVisible(true);
    }
  }, [mediaShowed]);

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

  return (
    <>
      <View px={3}>
        <View my={2}>
        {/* <Input
            label={namePlaceholder}
            onChange={(value) => setTitle(value)}
            value={title.value}
            autoCapitalize="words"
            onFocus={() => sheetRef.current.snapToIndex(2)}
            rules={[required]}
          /> */}
        </View>
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
      <Fabs actions={actions} />
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
};

EditPoint.propTypes = {
  locationSelected: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

EditPoint.defaultProps = {
  locationSelected: {},
  show: false,
  onClose: () => {},
};

export default EditPoint;
