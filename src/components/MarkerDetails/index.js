/* eslint-disable react/prop-types */
import React from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {View, Text, Divisor} from 'components/UI';
import theme from 'theme/theme';
import MediaCarousel from '../MediaCarousel';

const MarkerDetails = ({marker, sheetRef}) => {
  const snapPoints = [400, '95%'];

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
                    backgroundColor: '#000',
                    height: '35%',
                  }}>
                  <Text
                    fontSize={theme.font.sizes.SM}
                    mb={3}
                    textAlign="right"
                    flex={1}>
                    Visualizar todos
                  </Text>
                  <MediaCarousel />
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
