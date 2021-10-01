import React from 'react';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import {launchCamera} from 'react-native-image-picker';
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
      (response) => {
        if (selected === 'video') {
          response.assets[0].type = 'video/mp4';
        }
        if (response.assets && response.assets.length) {
          setMedias([...response.assets]);
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
