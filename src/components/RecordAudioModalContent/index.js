import React, {useState} from 'react';
import {Text} from 'components/UI';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
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

let audioRecorderPlayer = new AudioRecorderPlayer();

const RecordAudioModalContent = ({toggleModal}) => {
  const {ableToRecord} = useRecordAudio();
  // eslint-disable-next-line no-unused-vars
  const [recordSecs, setRecordSecs] = useState(null);
  const [recordMinutesTime, setrecordMinutesTime] = useState('00');
  const [recordSecondsTime, setrecordSecondsTime] = useState('00');
  const [recording, setRecording] = useState(false);
  const [pause, setPause] = useState(false);

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
  };

  const onStartRecord = async () => {
    setRecording(true);
    const result = await audioRecorderPlayer.startRecorder(undefined, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      const time = audioRecorderPlayer
        .mmssss(Math.floor(e.currentPosition))
        .split(':');
      setRecordSecs(e.currentPosition);
      setrecordMinutesTime(time[0]);
      setrecordSecondsTime(time[1]);
      setPause(false);
    });

    console.log('salvando áudio em: ', result);
  };

  const onPauseRecord = async () => {
    const result = await audioRecorderPlayer.pauseRecorder();
    setRecording(false);
    setPause(true);
    console.log(result);
  };

  const onResumeRecord = async () => {
    setRecording(true);
    const result = await audioRecorderPlayer.resumeRecorder();
    setPause(false);
    console.log(result);
  };

  const onStopRecord = async () => {
    setRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    audioRecorderPlayer = new AudioRecorderPlayer();
    setRecordSecs(0);
    setrecordMinutesTime('00');
    setrecordSecondsTime('00');
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
          {`${recordMinutesTime}:${recordSecondsTime}`}
        </Text>
        <Icon size={25} name="microphone" />
      </AudioContainer>
      <ManageRecordButtons>
        <Btn
          title=""
          icon={recording ? 'pause' : 'play-arrow'}
          size={20}
          background="#FFF"
          style={{width: '25%', alignItems: 'center'}}
          color={theme.colors.primary}
          onPress={() => {
            if (ableToRecord && recording) {
              onPauseRecord();
            } else if (ableToRecord && !pause) {
              onStartRecord();
            } else if (ableToRecord && pause) {
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
