import React from 'react';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import {launchCamera} from 'react-native-image-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import Btn from '../UI/Btn';
import {Container, Header, Title, OptionsButton} from './styles';

const SelectModal = ({setMedias}) => {
  const photoOptions = {
    mediaType: 'photo',
    maxWidth: 1300,
    maxHeight: 1300,
    quality: 0.9,
    saveToPhotos: true,
  };

  const videoOptions = {
    mediaType: 'video',
    videoQuality: 'high',
    saveToPhotos: true,
  };

  const handleOption = (selected) => {
    launchCamera(
      selected === 'photo' ? photoOptions : videoOptions,
      async (videoResponse) => {
        if (selected === 'video') {
          const newType = videoResponse;
          newType.assets[0].type = 'video/mp4';

          const thumb = await createThumbnail({
            url: videoResponse.assets[0].uri,
            timeStamp: 10000,
          });
          newType.assets[0].thumb = thumb.path;
        }
        if (videoResponse.assets && videoResponse.assets.length) {
          setMedias([...videoResponse.assets]);
        }
      },
    );
  };

  return (
    <Container>
      <Header>
        <Title fontSize={theme.font.sizes.ML}>Selecionar modo de câmera</Title>
      </Header>
      <OptionsButton>
        <Btn
          title="Foto"
          background="#FFF"
          style={{borderWidth: 0.5}}
          color={theme.colors.primary}
          onPress={() => handleOption('photo')}
        />
        <Btn
          title="Vídeo"
          background="#FFF"
          style={{borderWidth: 0.5}}
          color={theme.colors.primary}
          onPress={() => handleOption('video')}
        />
      </OptionsButton>
    </Container>
  );
};

SelectModal.propTypes = {
  setMedias: PropTypes.func,
};

SelectModal.defaultProps = {
  setMedias: () => {},
};

export default SelectModal;
