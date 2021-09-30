import React, { useState } from 'react';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import Btn from '../UI/Btn';
import {launchCamera} from 'react-native-image-picker';
import {
  Container,
  Header,
  Title,
  OptionsButton,
} from './styles';

const SelectModal = ({ toggleModal }) => {

  const [option, setOption] = useState('');

  const cameraOptions = {
    mediaType: option,
    maxWidth: 1300,
    maxHeight: 1300,
    quality: 0.9,
    saveToPhotos: true,
    selectionLimit: 0,
  };

  const onSelectMedia = (response) => {
    console.log(response);
  };

  const handleOption = (selected) => {
    setOption(selected);
    toggleModal();
    cameraOptions.mediaType = selected
    
    launchCamera(cameraOptions, onSelectMedia);
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
          style={{ borderWidth: 0.5 }}
          color={theme.colors.primary}
          onPress={() => handleOption('photo')}
        />
        <Btn
          title="Vídeo"
          background="#FFF"
          style={{ borderWidth: 0.5 }}
          color={theme.colors.primary}
          onPress={() => handleOption('video')}
        />
      </OptionsButton>
    </Container>
  );
};

SelectModal.propTypes = {
  toggleModal: PropTypes.func,
};

SelectModal.defaultProps = {
  toggleModal: () => { },
};

export default SelectModal;
