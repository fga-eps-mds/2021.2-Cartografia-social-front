import React from 'react';
import {Text} from 'components/UI';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import Btn from '../UI/Btn';
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
        {/* <Icon name="play" color={theme.colors.primary} /> */}
        <Btn
          icon="play-arrow"
          size={20}
          background="#FFF"
          style={{width: '25%', alignItems: 'center'}}
          color={theme.colors.primary}
          onPress={() => {}}
        />
        <Btn
          icon="stop"
          background="#FFF"
          style={{width: '25%'}}
          color={theme.colors.primary}
          onPress={() => {}}
        />
      </ManageRecordButtons>
      <OptionsButton>
        <Btn
          title="Cancelar"
          background="#FFF"
          style={{borderWidth: 0.5}}
          color={theme.colors.primary}
          onPress={toggleModal}
        />
        <Btn title="Salvar" color="#FFF" onPress={toggleModal} />
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
