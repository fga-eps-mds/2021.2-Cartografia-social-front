/* eslint-disable no-await-in-loop */
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {Btn, Input, View, FlatList, Text} from 'components/UI';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import * as Actions from 'store/actions';
import api from 'services/api';
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

const EditPoint = ({marker, markerDetails, editHandler, setSelectedMarker}) => {
  UseCamera();
  const dispatch = useDispatch();
  const listMarkers = useSelector((state) => state.markers.list);
  const user = useSelector(auth);

  let namePlaceholder = 'Digite aqui o título do novo ponto';
  let descriptionPlaceholder = 'Digite aqui a descrição do novo ponto';
  let buttonName = 'Salvar ponto';

  if (marker.coordinates) {
    namePlaceholder = 'Digite aqui o título da nova área';
    descriptionPlaceholder = 'Digite aqui a descrição da nova área';
    buttonName = 'Salvar área';
  }

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
  const [audioCount, setAudioCount] = useState(0);
  const [medias, setMedias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCamVisible, setModalCamVisible] = useState(false);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [modalShowMediaVisible, setModalShowMediaVisible] = useState(false);
  const [mediaShowed, setMediaShowed] = useState({});
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [openedImage, setOpenedImage] = useState({});

  useEffect(() => {
    if (markerDetails) {
      setMedias([...markerDetails]);
    }
  }, [markerDetails]);

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

  const onSave = async () => {
    if (!title.value) {
      Alert.alert('atenção!', 'o nome não pode ser vazio');
      return;
    }
    let locationId = null;
    let updatedMarker;
    const mediasToRemove = [];
    const mediasToAdd = [];

    const isEditingArea = 'coordinates' in marker;
    const markerIndex = listMarkers.indexOf(marker);

    if (isEditingArea) {
      updatedMarker = {
        coordinates: marker.coordinates,
        title: title.value,
        description: description.value,
        multimedia: medias,
        id: marker.id,
      };
    } else {
      updatedMarker = {
        latitude: marker.latitude,
        longitude: marker.longitude,
        title: title.value,
        description: description.value,
        multimedia: medias,
        id: marker.id,
      };
    }

    if (markerDetails) {
      markerDetails.map((m) => {
        if (!updatedMarker.multimedia.includes(m)) {
          mediasToRemove.push(m);
        }
        return m;
      });
    }
    updatedMarker.multimedia.map((m) => {
      if (!markerDetails || !markerDetails.includes(m)) {
        mediasToAdd.push(m);
      }
      return m;
    });

    if (user && user.id) {
      let endpoint = isEditingArea ? '/maps/area' : '/maps/point';
      await api
        .put(endpoint, updatedMarker)
        .then((response) => {
          locationId = response.data;
        })
        .catch(() => {
          Alert.alert(
            'Tente mais tarde',
            'Não foi possivel editar a marcação.',
          );
        });

      for (let index = 0; index < mediasToRemove.length; index++) {
        const media = mediasToRemove[index];

        const {mediaId} = media;
        const removeMidiaDto = {
          id: mediaId,
        };
        await api
          .delete('midia/removeMidia', {data: removeMidiaDto})
          .catch(() => {
            Alert.alert('Tente mais tarde.', `Erro ao excluir arquivo`);
          });

        if (mediaId !== null) {
          const mediaPoint = {
            locationId: locationId.id,
            mediaId,
          };
          endpoint = isEditingArea
            ? '/maps/removeMediaFromArea'
            : '/maps/removeMediaFromPoint';
          await api.delete(endpoint, {data: mediaPoint}).catch(() => {
            Alert.alert(
              'Tente mais tarde.',
              `Erro ao excluir midia do ponto: ${media.fileName}`,
            );
          });
        }
      }

      for (let index = 0; index < mediasToAdd.length; index++) {
        const media = mediasToAdd[index];
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
          endpoint = isEditingArea
            ? '/maps/addMediaToArea'
            : '/maps/addMediaToPoint';
          await api.post(endpoint, newMediaPoint).catch(() => {
            Alert.alert(
              'Tente mais tarde.',
              `Erro ao adicionar midia à marcação: ${media.fileName}`,
            );
          });
        }
      }
    }

    dispatch(Actions.updateMarker(updatedMarker, markerIndex));
    setSelectedMarker(updatedMarker);
    editHandler(false);
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
    const newMediasList = medias.filter((media) => media !== mediaPath);

    setMedias(newMediasList);
  };

  useEffect(() => {
    if (Object.keys(mediaShowed).length !== 0) {
      setModalShowMediaVisible(true);
    }
  }, [mediaShowed]);

  const renderItem = ({item}) => {
    if (
      item.mediaType === 'image' ||
      (item.url && item.url.includes('.jpeg')) ||
      (item.url && item.url.includes('.png')) ||
      (item.url && item.url.includes('.jpg'))
    ) {
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

    if (
      item.type === 'application/pdf' ||
      (item.url && item.url.includes('.pdf'))
    ) {
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
          <Input
            label={namePlaceholder}
            onChange={(value) => setTitle(value)}
            value={title.value}
            autoCapitalize="words"
          />
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
        <Btn onPress={onSave} disabled={!formIsValid()} title={buttonName} />
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
          <SelectModal toggleModal={toggleCamModal} setMedias={setMediasList} />
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
  marker: PropTypes.shape({
    coordinates: [],
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    multimedia: [],
    id: PropTypes.string,
  }),
  markerDetails: [],
  editHandler: PropTypes.func,
  setSelectedMarker: PropTypes.func,
};

EditPoint.defaultProps = {
  marker: {},
  markerDetails: [],
  editHandler: null,
  setSelectedMarker: () => {},
};

export default EditPoint;
