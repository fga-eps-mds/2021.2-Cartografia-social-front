import React, {useState, useEffect} from 'react';
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

var audioRecorderPlayer = new AudioRecorderPlayer();

const RecordAudioModalContent = ({toggleModal}) => {
  const {ableToRecord} = useRecordAudio();
  // eslint-disable-next-line no-unused-vars
  const [recordSecs, setRecordSecs] = useState(null);
  const [recordMinutesTime, setrecordMinutesTime] = useState('00');
  const [recordSecondsTime, setrecordSecondsTime] = useState('00');
  const [recording, setRecording] = useState(false);
  const [pause, setPause] = useState(false);

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      const time = audioRecorderPlayer
        .mmssss(Math.floor(e.currentPosition))
        .split(':');
      setRecordSecs(e.currentPosition);
      console.log(e.currentPosition);
      setrecordMinutesTime(time[0]);
      setrecordSecondsTime(time[1]);
      setRecording(true);
      setPause(false);
    });

    console.log(result);
  };

  const onPauseRecord = async () => {
    const result = await audioRecorderPlayer.pauseRecorder();
    setRecording(false);
    setPause(true);
    console.log(result);
  };

  const onResumeRecord = async () => {
    const result = await audioRecorderPlayer.resumeRecorder();
    setRecording(true);
    setPause(false);
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    audioRecorderPlayer = new AudioRecorderPlayer();
    setRecordSecs(0);
    setrecordMinutesTime('00');
    setrecordSecondsTime('00');
    setRecording(false);
    setPause(false);
    console.log(result);
  };

  const onCancel = () => {
    onStopRecord();
    toggleModal();
  };

  return (
    <Container>
      <Header>
        <Title fontSize={theme.font.sizes.ML}>Gravar áudio</Title>
      </Header>
      <AudioContainer>
        <Icon size={25} name="clock" />
        <Text fontWeight="bold" fontSize={theme.font.sizes.SM} mb={2}>
          {recordMinutesTime}:{recordSecondsTime}
        </Text>
        <Icon size={25} name="microphone" />
      </AudioContainer>
      <ManageRecordButtons>
        {/* <Icon name="play" color={theme.colors.primary} /> */}
        <Btn
          title=""
          icon={recording ? 'pause' : 'play-arrow'}
          size={20}
          background="#FFF"
          style={{width: '25%', alignItems: 'center'}}
          color={theme.colors.primary}
          onPress={() => {
            if (ableToRecord && recording) {
              console.log('teste1');
              onPauseRecord();
            } else if (ableToRecord && pause === false) {
              console.log('teste2');
              onStartRecord();
            } else if (ableToRecord && pause) {
              console.log('teste3');
              onResumeRecord();
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
          onPress={onCancel}
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
