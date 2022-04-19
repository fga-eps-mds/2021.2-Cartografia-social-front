/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {View, Text, Divisor, Btn} from 'components/UI';
import theme from 'theme/theme';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import ShowMediaModal from 'components/ShowMediaModal';
import {Alert, TouchableOpacity} from 'react-native';
import EditPoint from 'components/EditPoint';
import api from 'services/api';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import MediasList from '../MediasList';

const MarkerDetails = ({marker, setSelectedMarker, sheetRef, close}) => {
  const user = useSelector(auth);

  const snapPoints = [400, '95%'];
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [markerDetails, setMarkerMedias] = useState(null);
  const [openedImage, setOpenedImage] = useState({});
  const [audioCount, setAudioCount] = useState(0);
  const [mediaShowed, setMediaShowed] = useState({});
  const [modalShowMediaVisible, setModalShowMediaVisible] = useState(false);
  const [editing, setEdit] = useState(false);

  const handleShowMedia = (fileType, fileUri, fileDuration) => {
    const media = {
      type: fileType,
      uri: fileUri,
      duration: fileDuration,
    };
    setMediaShowed(media);
  };

  const closeShowMediaModal = () => {
    setMediaShowed({});
    setModalShowMediaVisible(false);
  };

  const validarArea = () => {
    marker.validation = 'rgba(255,255,0,0.5)';
  };

  const eraseMarker = async () => {
    let endpoint = '/maps/point/';
    if (marker.coordinates) {
      endpoint = '/maps/area/';
    }
    try {
      await api.delete(`${endpoint}${marker.id}`);
      close();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao se comunicar com o servidor. Tente novamente',
      );
    }
  };

  const sortMediasByImages = () => {
    const medias = markerDetails || [...marker.multimedia];
    medias.sort((a, b) => {
      if (a.mediaType === 'image') {
        return -1;
      }
      if (b.mediaType === 'image') {
        return 1;
      }
      return 0;
    });

    return medias;
  };

  const onCloseBottomSheet = () => {
    setEdit(false);
  };

  useEffect(() => {
    if (Object.keys(mediaShowed).length !== 0) {
      setModalShowMediaVisible(true);
    }
  }, [mediaShowed]);

  const fetchMarker = async () => {
    try {
      const response = await api.get(`maps/midiaFromPoint/${marker.id}`);
      if (response.data.length) {
        setMarkerMedias(response.data);
      } else {
        setMarkerMedias(null);
      }
    } catch (error) {
      // nothing
    }
  };

  useEffect(() => {
    if (marker && marker.id) {
      fetchMarker();
    }
  }, [marker, editing]);

  return (
    <BottomSheet
      enablePanDownToClose
      ref={sheetRef}
      index={-1}
      onClose={onCloseBottomSheet}
      snapPoints={snapPoints}>
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{height: '100%'}}>
        {editing ? (
          <>
            <TouchableOpacity
              style={{
                width: '25%',
                height: '5%',
                backgroundColor: '#FFF',
                alignSelf: 'flex-end',
              }}
              onPress={() => setEdit(false)}>
              <Text fontWeight="bold" textAlign="right" mr={3}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <EditPoint
              marker={marker}
              markerDetails={markerDetails}
              editHandler={setEdit}
              setSelectedMarker={setSelectedMarker}
            />
          </>
        ) : (
          <>
            {marker && marker.title ? (
              <>
                <View
                  style={{
                    width: '100%',
                    height: '5%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFF',
                  }}>
                  {user.id ? (
                    <TouchableOpacity
                      style={{
                        width: '25%',
                        backgroundColor: '#FFF',
                        alignItems: 'center',
                      }}
                      onPress={eraseMarker}>
                      <Text fontWeight="bold" color="#FF0000">
                        Excluir
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    style={{
                      width: '25%',
                      backgroundColor: '#FFF',
                      alignItems: 'center',
                    }}
                    onPress={() => setEdit(true)}>
                    <Text fontWeight="bold" color="#000">
                      Editar
                    </Text>
                  </TouchableOpacity>
                </View>
                <View m={3} style={{height: '5%'}}>
                  <Text fontWeight="bold">{marker.title}</Text>
                  <Divisor my={2} />
                </View>
                <View px={3} style={{height: '100%'}}>
                  {marker.multimedia.length || markerDetails ? (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        height: '35%',
                      }}>
                      <Text
                        fontWeight="bold"
                        fontSize={theme.font.sizes.SM}
                        mb={2}>
                        Multimídia:
                      </Text>
                      <MediasList
                        medias={sortMediasByImages()}
                        setOpenedImage={setOpenedImage}
                        setIsVisibleImageModal={setIsVisibleImageModal}
                        handleShowMedia={handleShowMedia}
                        audioCount={audioCount}
                        setAudioCount={setAudioCount}
                      />
                    </View>
                  ) : null}
                  <View>
                    <Text
                      fontWeight="bold"
                      fontSize={theme.font.sizes.SM}
                      mb={2}>
                      Descrição:
                    </Text>
                    <Text ml={3}>{marker.description}</Text>
                  </View>
                  <View style={{marginTop: 50}}>
                    <Btn
                      title="Validar Área"
                      onPress={() => {
                        validarArea();
                        console.log(marker);
                        // Alert.alert("Área validada")
                      }}
                    />
                  </View>
                </View>
              </>
            ) : (
              <View />
            )}
          </>
        )}
        <ImageView
          images={[{uri: openedImage.uri || openedImage.url}]}
          imageIndex={0}
          visible={visibleImageModal}
          onRequestClose={() => setIsVisibleImageModal(false)}
        />
        <Modal
          isVisible={modalShowMediaVisible}
          style={{justifyContent: 'center', margin: 0}}>
          <ShowMediaModal
            media={mediaShowed}
            closeModal={closeShowMediaModal}
          />
        </Modal>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

// MarkerDetails.propTypes = {
//   marker: PropTypes.shape({
//     icon: PropTypes.string,
//     onPress: PropTypes.func,
//   }),
// };

// MarkerDetails.defaultProps = {
//   marker: {},
// };

export default MarkerDetails;
