/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Btn, View, Text, Divisor, Input, FlatList} from 'components/UI';
import theme from 'theme/theme';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import ShowMediaModal from 'components/ShowMediaModal';
import MediasList from '../MediasList';
import { TouchableOpacity } from 'react-native';
import required from 'validators/required';
import ImagePreview from '../ImagePreview';
import AudioPreview from '../AudioPreview';
import DocumentPreview from '../DocumentPreview';
import VideoPreview from '../VideoPreview';
import EditPoint from 'components/EditPoint';

import {Container, Icon} from './styles';

const MarkerDetails = ({marker, sheetRef}) => {
  const snapPoints = [400, '95%'];
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [openedImage, setOpenedImage] = useState({});
  const [audioCount, setAudioCount] = useState(0);
  const [mediaShowed, setMediaShowed] = useState({});
  const [modalShowMediaVisible, setModalShowMediaVisible] = useState(false);
  const [editing, setEdit] = useState(false);
  console.log(marker);

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

  const sortMediasByImages = () => {
    const medias = [...marker.multimedia];
    medias.sort((a, b) => {
      if (a.type === 'image/jpeg') {
        return -1;
      }
      if (b.type === 'image/jpeg') {
        return 1;
      }
      return 0;
    });
    return medias;
  };

  const DeleteMedia = (mediaPath) => {
    const newMediasList = marker.multimedia.filter((media) => media.uri !== mediaPath);
    marker.multimedia = newMediasList;
    useState();
  };

  useEffect(() => {
    setEdit(false);
    if (Object.keys(mediaShowed).length !== 0) {
      setModalShowMediaVisible(true);
    }
  }, [mediaShowed]);

  const renderItem = ({item}) => {
    if (item.type === 'image/jpeg') {
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
    <BottomSheet
      enablePanDownToClose
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}>
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{height: '100%'}}>
        {editing ? (
          <>
          <TouchableOpacity style={{backgroundColor: '#AAAA'}} onPress={() => setEdit(false)}>
            <Text fontWeight="bold" textAlign="right" mr={3}>Cancelar</Text>
          </TouchableOpacity>
          <EditPoint 
            marker={marker}
            editHandler={setEdit}>
          </EditPoint>
          </>
        ) : (
          <>
            {marker && marker.title ? (
              <>
                <TouchableOpacity style={{backgroundColor: '#AAAA'}} onPress={() => setEdit(true)}>
                  <Text fontWeight="bold" textAlign="right" mr={3}>Editar</Text>
                </TouchableOpacity>
                <View mt={0} m={3} style={{height: '5%'}}>
                  <Text fontWeight="bold">{marker.title}</Text>
                  <Divisor my={2} />
                </View>
                <View px={3} style={{height: '100%'}}>
                  {marker.multimedia.length ? (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        height: '35%',
                      }}>
                      <Text
                        fontSize={theme.font.sizes.SM}
                        mb={3}
                        textAlign="right"
                        flex={0.5}>
                        Visualizar todos
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
                  <View p={3}>
                    <Text>{marker.description}</Text>
                  </View>
                </View>
              </>
            ) : (
              <View />
            )}
          </>
        )}
        <ImageView
          images={[openedImage]}
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
