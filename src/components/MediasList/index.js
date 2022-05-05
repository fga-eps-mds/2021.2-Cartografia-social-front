import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'components/UI';
import ImagePreview from 'components/ImagePreview';
import AudioPreview from 'components/AudioPreview';
import DocumentPreview from 'components/DocumentPreview';
import VideoPreview from 'components/VideoPreview';
import {Container} from './styles';

const MediasList = ({
  medias,
  setOpenedImage,
  setIsVisibleImageModal,
  handleShowMedia,
  audioCount,
  setAudioCount,
}) => {
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
          hasDelete={false}
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
          hasDelete={false}
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
          hasDelete={false}
        />
      );
    }

    return (
      <VideoPreview
        item={item}
        handleShowMedia={handleShowMedia}
        hasDelete={false}
      />
    );
  };

  return (
    <Container>
      <FlatList
        data={medias}
        horizontal
        keyExtractor={(item) => item.uri}
        horizontalScroll
        renderItem={renderItem}
      />
    </Container>
  );
};

MediasList.propTypes = {
  medias: PropTypes.arrayOf(PropTypes.object),
  setOpenedImage: PropTypes.func,
  setIsVisibleImageModal: PropTypes.func,
  handleShowMedia: PropTypes.func,
  audioCount: PropTypes.number,
  setAudioCount: PropTypes.func,
};

MediasList.defaultProps = {
  medias: [{}],
  setOpenedImage: () => null,
  setIsVisibleImageModal: () => null,
  handleShowMedia: () => null,
  audioCount: 0,
  setAudioCount: () => null,
};

export default MediasList;
