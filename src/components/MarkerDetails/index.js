/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {View, Text, Divisor} from 'components/UI';
import theme from 'theme/theme';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import ShowMediaModal from 'components/ShowMediaModal';
import MediasList from '../MediasList';

const MarkerDetails = ({marker, sheetRef}) => {
  const snapPoints = [400, '95%'];
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [openedImage, setOpenedImage] = useState({});
  const [audioCount, setAudioCount] = useState(0);
  const [mediaShowed, setMediaShowed] = useState({});
  const [modalShowMediaVisible, setModalShowMediaVisible] = useState(false);

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

  useEffect(() => {
    if (Object.keys(mediaShowed).length !== 0) {
      setModalShowMediaVisible(true);
    }
  }, [mediaShowed]);

  return (
    <BottomSheet
      enablePanDownToClose
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}>
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{height: '100%'}}>
        {marker && marker.title ? (
          <>
            <View m={3} style={{height: '5%'}}>
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
                  <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
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
                  <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
                    Descrição:
                  </Text>
                <Text ml={3}>{marker.description}</Text>
              </View>
            </View>
          </>
        ) : (
          <View />
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
