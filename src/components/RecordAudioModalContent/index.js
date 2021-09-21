import React from 'react';
import {Button} from 'react-native';
import {Text} from 'components/UI';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Title,
  AudioContainer,
  ManageRecordButtons,
  OptionsButton,
  Icon,
} from './styles';

const RecordAudioModalContent = ({toggleModal}) => {
  return (
    <Container>
      <Header>
        <Title fontSize={theme.font.sizes.ML}>Gravar áudio</Title>
      </Header>
      <AudioContainer>
        <Icon size={25} name="clock" />
        <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
          00:00
        </Text>
        <Icon size={25} name="microphone" />
      </AudioContainer>
      <ManageRecordButtons>
        <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
          I am the modal content
        </Text>
      </ManageRecordButtons>
      <OptionsButton>
        <Button title="Cancelar" onPress={toggleModal} />
        <Button title="Salvar" onPress={() => {}} />
      </OptionsButton>
    </Container>
  );
};

RecordAudioModalContent.propTypes = {
  toggleModal: PropTypes.func,
};

RecordAudioModalContent.defaultProps = {
  toggleModal: () => {},
};

export default RecordAudioModalContent;
