/* eslint-disable react/prop-types */
import React from 'react';
import { Dimensions } from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {View, Text, Divisor} from 'components/UI';
import Carousel from 'react-native-snap-carousel';
import theme from 'theme/theme';
import {onChange} from 'react-native-reanimated';
import {Image} from './styles';

const MarkerDetails = ({marker, sheetRef}) => {
  const snapPoints = [400, '90%'];
  const renderItem = ({item}) => <Image source={{uri: item.uri}} />;
  const windowWidth = Dimensions.get('window').width;
  return (
    <BottomSheet
      enablePanDownToClose
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}>
      <BottomSheetScrollView keyboardShouldPersistTaps="handled">
        {marker && marker.title ? (
          <>
            <View m={3}>
              <Text fontWeight="bold">{marker.title}</Text>
              <Divisor my={2} />
            </View>
            <View px={3}>
              {marker.multimedia.length ? (
                <View>
                  <Text fontSize={theme.font.sizes.SM} mb={3} textAlign="right">
                    Visualizar todos
                  </Text>
                  <Carousel
                    data={marker.multimedia}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uri}
                    sliderWidth={windowWidth}
                    itemWidth={200}
                    loop
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
