import React from 'react';
import PropTypes from 'prop-types';
import normalize from 'react-native-normalize';
import {MediaContainer, MediaButton, DeleteButton, Icon} from '../../styles';
import {Image} from './styles';

const ImagePreview = ({
  item,
  setOpenedImage,
  setIsVisibleImageModal,
  DeleteMedia,
}) => {
  return (
    <MediaContainer>
      <MediaButton
        onPress={() => {
          setOpenedImage(item);
          setIsVisibleImageModal(true);
        }}>
        <Image source={{uri: item.uri}} />
      </MediaButton>
      <DeleteButton onPress={() => DeleteMedia(item.uri)}>
        <Icon size={normalize(20)} name="trash" color="#FF0000" />
      </DeleteButton>
    </MediaContainer>
  );
};

ImagePreview.propTypes = {
  item: PropTypes.shape({
    uri: PropTypes.string,
  }),
  setOpenedImage: PropTypes.func,
  setIsVisibleImageModal: PropTypes.func,
  DeleteMedia: PropTypes.func,
};

ImagePreview.defaultProps = {
  item: {},
  setOpenedImage: () => null,
  setIsVisibleImageModal: () => null,
  DeleteMedia: () => null,
};

export default ImagePreview;
