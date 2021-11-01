import React from 'react';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import {launchImageLibrary} from 'react-native-image-picker';
import {Text, TouchableOpacity} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Container, Header, Title, Icon, Column, Row} from './styles';

const MediaModalContent = ({setMedias}) => {
  const photoOptions = {
    mediaType: 'photo',
    maxWidth: 1300,
    maxHeight: 1300,
    // quality: 0.9,
    // saveToPhotos: true,
    selectionLimit: 0,
  };

  const videoOptions = {
    mediaType: 'video',
    videoQuality: 'high',
    saveToPhotos: true,
  };

  const handleOption = (selected) => {
    launchImageLibrary(
      selected === 'photo' ? photoOptions : videoOptions,
      async (videoResponse) => {
        if (videoResponse.didCancel) {
          return;
        }

        videoResponse.assets.map(async (media) => {
          const newType = media;
          if (selected === 'video') {
            newType.type = 'video/mp4';
            newType.mediaType = 'video';

            const thumb = await createThumbnail({
              url: videoResponse.assets[0].uri,
              timeStamp: 10000,
            });
            newType.thumb = thumb.path;
          } else {
            newType.mediaType = 'image';
          }

          return null;
        });
        if (videoResponse.assets && videoResponse.assets.length) {
          setMedias([...videoResponse.assets]);
        }
      },
    );
  };

  return (
    <Container>
      <Header>
        <Title fontSize={theme.font.sizes.ML}>Upload</Title>
      </Header>
      <Row>
        <Column>
          <TouchableOpacity
            onPress={() => handleOption('photo')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
              margin: 30,
              borderColor: theme.colors.primary,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="camera" />
          </TouchableOpacity>
          <Text>Foto</Text>
        </Column>
        <Column>
          <TouchableOpacity
            onPress={() => handleOption('video')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
              margin: 30,
              borderColor: theme.colors.primary,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="video" />
          </TouchableOpacity>
          <Text>Video</Text>
        </Column>
      </Row>
    </Container>
  );
};

MediaModalContent.propTypes = {
  setMedias: PropTypes.func,
};

MediaModalContent.defaultProps = {
  setMedias: () => {},
};

export default MediaModalContent;
