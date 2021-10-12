/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {View, Text, Divisor} from 'components/UI';
import theme from 'theme/theme';
import MediasList from '../MediasList';

const MarkerDetails = ({marker, sheetRef}) => {
  const snapPoints = [400, '95%'];
  const [visibleImageModal, setIsVisibleImageModal] = useState(false);
  const [openedImage, setOpenedImage] = useState({});
  const [audioCount, setAudioCount] = useState(0);

  const handleShowMedia = (fileType, fileUri, fileDuration) => {
    const media = {
      type: fileType,
      uri: fileUri,
      duration: fileDuration,
    };
    setMediaShowed(media);
  };

  const DeleteMedia = (mediaPath) => {
    const newMediasList = medias.filter((media) => media.uri !== mediaPath);

    setMedias(newMediasList);
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
                  <Text
                    fontSize={theme.font.sizes.SM}
                    mb={3}
                    textAlign="right"
                    flex={1}>
                    Visualizar todos
                  </Text>
                  <MediasList
                    medias={marker.multimedia}
                    setOpenedImage={setOpenedImage}
                    setIsVisibleImageModal={setIsVisibleImageModal}
                    DeleteMedia={DeleteMedia}
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
