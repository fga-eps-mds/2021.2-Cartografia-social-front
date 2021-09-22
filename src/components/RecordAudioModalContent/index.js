import React, {useState} from 'react';
import {Text} from 'components/UI';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import useRecordAudio from 'services/useRecordAudio';
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

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordAudioModalContent = ({toggleModal}) => {
  const {ableToRecord} = useRecordAudio();
  // eslint-disable-next-line no-unused-vars
  const [recordSecs, setRecordSecs] = useState(null);
  const [recordTime, setrecordTime] = useState('00:00:00');

  const onStartRecord = async () => {
    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.currentPosition);
      setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    // console.log(result);
  };

  const onStopRecord = async () => {
    console.log('aqui');
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    // console.log(result);
  };

  return (
    <Container>
      <Header>
        <Title fontSize={theme.font.sizes.ML}>Gravar áudio</Title>
      </Header>
      <AudioContainer>
        <Icon size={25} name="clock" />
        <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
          {recordTime}
        </Text>
        <Icon size={25} name="microphone" />
      </AudioContainer>
      <ManageRecordButtons>
        {/* <Icon name="play" color={theme.colors.primary} /> */}
        <Btn
          title=""
          icon="play-arrow"
          size={20}
          background="#FFF"
          style={{width: '25%', alignItems: 'center'}}
          color={theme.colors.primary}
          onPress={() => {
            if (ableToRecord) {
              onStartRecord();
            }
          }}
        />
        <Btn
          title=""
          icon="stop"
          background="#FFF"
          style={{width: '25%'}}
          color={theme.colors.primary}
          onPress={() => {
            onStopRecord();
          }}
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
