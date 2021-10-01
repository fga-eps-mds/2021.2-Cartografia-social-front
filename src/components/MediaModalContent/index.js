import React from 'react';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import {launchImageLibrary} from 'react-native-image-picker';
import {Text, TouchableOpacity} from 'react-native';
import {Container, Header, Title, Icon, Column, Row} from './styles';

const MediaModalContent = ({toggleModal, setMedias}) => {
  const photoOptions = {
    mediaType: 'photo',
    maxWidth: 1300,
    maxHeight: 1300,
    quality: 0.9,
    saveToPhotos: true,
    selectionLimit: 0,
  };

  const videoOptions = {
    mediaType: 'video',
    videoQuality: 'high',
    saveToPhotos: true,
  };

  const handleOption = (selected) => {
    toggleModal();

    launchImageLibrary(
      selected === 'photo' ? photoOptions : videoOptions,
      (response) => {
        if (response.assets && response.assets.length) {
          setMedias([...response.assets]);
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
            onPress={() => null}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
              margin: 5,
              borderColor: theme.colors.primary,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="file" />
          </TouchableOpacity>
          <Text>Documento</Text>
        </Column>
        <Column>
          <TouchableOpacity
            onPress={() => handleOption('photo')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
              margin: 5,
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
              margin: 5,
              borderColor: theme.colors.primary,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="video" />
          </TouchableOpacity>
          <Text>Video</Text>
        </Column>
        <Column>
          <TouchableOpacity
            onPress={() => null}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
              margin: 5,
              borderColor: theme.colors.primary,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="microphone" />
          </TouchableOpacity>
          <Text>Audio</Text>
        </Column>
      </Row>
    </Container>
  );
};

MediaModalContent.propTypes = {
  toggleModal: PropTypes.func,
  setMedias: PropTypes.func,
};

MediaModalContent.defaultProps = {
  toggleModal: () => {},
  setMedias: () => {},
};

export default MediaModalContent;
