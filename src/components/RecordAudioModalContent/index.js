import React, {useState} from 'react';
import {Text} from 'components/UI';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import useRecordAudio from 'services/useRecordAudio';
import instance from 'services/api2';
import FormData from 'form-data';
import Btn from '../UI/Btn';
import {
  Container,
  Header,
  Title,
  AudioContainer,
  OptionsButton,
  Icon,
} from './styles';

let audioRecorderPlayer = new AudioRecorderPlayer();

const RecordAudioModalContent = ({toggleModal}) => {
  const {ableToRecord} = useRecordAudio();
  const [recordMinutesTime, setrecordMinutesTime] = useState('00');
  const [recordSecondsTime, setrecordSecondsTime] = useState('00');
  const [recording, setRecording] = useState(false);
  const [recordPlayMinTime, setRecordPlayMinTime] = useState('00');
  const [recordPlaySecTime, setRecordPlaySecTime] = useState('00');
  const [hasAudio, setHasAudio] = useState(false);
  const [startPlay, setStartPlay] = useState(false);
  const [audioPath, setAudioPath] = useState('');

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
  };

  // função para começar a gravar
  const onStartRecord = async () => {
    setRecording(true);
    const path = await audioRecorderPlayer.startRecorder(undefined, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      const time = audioRecorderPlayer
        .mmssss(Math.floor(e.currentPosition))
        .split(':');
      setrecordMinutesTime(time[0]);
      setrecordSecondsTime(time[1]);
    });

    setAudioPath(path);
  };

  const onStopRecord = async () => {
    setRecording(false);
    setHasAudio(true);
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  const deleteRecord = async () => {
    setHasAudio(false);
    audioRecorderPlayer = new AudioRecorderPlayer();
    setrecordMinutesTime('00');
    setrecordSecondsTime('00');
    setRecordPlayMinTime('00');
    setRecordPlaySecTime('00');
  };

  const onStartPlay = async () => {
    // function to play an audio after recording it.
    setStartPlay(true);
    await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        audioRecorderPlayer.stopPlayer();
        setStartPlay(false);
      }
      const time = audioRecorderPlayer
        .mmssss(Math.floor(e.currentPosition))
        .split(':');
      setRecordPlayMinTime(time[0]);
      setRecordPlaySecTime(time[1]);
    });
  };

  const onPausePlay = async () => {
    // function to pause an audio
    await audioRecorderPlayer.pausePlayer();
    setStartPlay(false);
  };

  const onCancel = () => {
    onStopRecord();
    toggleModal();
  };

  const onSave = async () => {
    toggleModal();
    const formData = new FormData();
    formData.append('name', 'new_audio');
    formData.append('file', {
      uri: audioPath,
      type: 'audio/mpeg',
      name: 'last_recording',
    });

    await instance.post('midia/uploadMidia', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
        {hasAudio ? (
          <>
            <Btn
              title=""
              icon="delete"
              background="#FFF"
              style={{width: '10%'}}
              color={theme.colors.primary}
              onPress={() => {
                deleteRecord();
              }}
            />
          </>
        ) : (
          <>
            <Btn
              title=""
              icon={recording ? 'pause' : 'mic'}
              size={25}
              background="#FFF"
              style={{width: '10%', alignItems: 'center'}}
              color={theme.colors.primary}
              onPress={() => {
                if (ableToRecord && recording) {
                  onStopRecord();
                } else if (ableToRecord) {
                  onStartRecord();
                }
              }}
            />
          </>
        )}
      </AudioContainer>
      {hasAudio ? (
        <>
          <Text fontWeight="bold" fontSize={theme.font.sizes.SM} my={2}>
            {`${recordPlayMinTime}:${recordPlaySecTime} / ${recordMinutesTime}:${recordSecondsTime}`}
          </Text>
          <Btn
            title=""
            icon={startPlay ? 'pause' : 'play-arrow'}
            size={25}
            background="#FFF"
            style={{width: '25%', alignItems: 'center'}}
            color={theme.colors.primary}
            onPress={() => {
              if (!startPlay) {
                onStartPlay();
              } else {
                onPausePlay();
              }
            }}
          />
        </>
      ) : null}
      <OptionsButton>
        <Btn
          title="Cancelar"
          background="#FFF"
          style={{borderWidth: 0.5}}
          color={theme.colors.primary}
          onPress={onCancel}
        />
        <Btn title="Salvar" color="#FFF" onPress={onSave} />
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
