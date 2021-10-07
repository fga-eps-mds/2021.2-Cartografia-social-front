import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {Text} from 'components/UI';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import useRecordAudio from 'services/useRecordAudio';
import RNFetchBlob from 'rn-fetch-blob';
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

const RecordAudioModalContent = ({
  toggleModal,
  setMedias,
  value,
  setAudioCount,
}) => {
  const {ableToRecord} = useRecordAudio();
  const [recordMinutesTime, setrecordMinutesTime] = useState('00');
  const [recordSecondsTime, setrecordSecondsTime] = useState('00');
  const [recording, setRecording] = useState(false);
  const [recordPlayMinTime, setRecordPlayMinTime] = useState('00');
  const [recordPlaySecTime, setRecordPlaySecTime] = useState('00');
  const [hasAudio, setHasAudio] = useState(false);
  const [startPlay, setStartPlay] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [audioDuration, setAudioDuration] = useState(0);

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
  };

  const {dirs} = RNFetchBlob.fs;

  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/sound${value}.mp4`,
  });

  // função para começar a gravar
  const onStartRecord = async () => {
    if (value === 6) {
      Alert.alert(
        'Atingiu o limite máximo (5) de gravação de áudios na criação de um marcador',
      );
      toggleModal();
      return;
    }
    setRecording(true);
    const response = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setAudioDuration(e.currentPosition);
      const time = audioRecorderPlayer
        .mmssss(Math.floor(e.currentPosition))
        .split(':');
      setrecordMinutesTime(time[0]);
      setrecordSecondsTime(time[1]);
    });
    setAudioPath(response);
  };

  const onStopRecord = async () => {
    setRecording(false);
    setHasAudio(true);
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  const deleteRecord = async () => {
    setHasAudio(false);
    await audioRecorderPlayer.pausePlayer();
    audioRecorderPlayer = new AudioRecorderPlayer();
    setrecordMinutesTime('00');
    setrecordSecondsTime('00');
    setRecordPlayMinTime('00');
    setRecordPlaySecTime('00');
  };

  const onStartPlay = async () => {
    // function to play an audio after recording it.
    setStartPlay(true);
    await audioRecorderPlayer.startPlayer(path);
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
    const objAudio = {
      fileName: `sound${value}.mp4`,
      type: 'audio/mpeg',
      uri: audioPath,
      duration: audioDuration,
    };
    setAudioCount();
    setMedias([objAudio]);
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
        {hasAudio ? (
          <Btn title="Salvar" color="#FFF" onPress={onSave} />
        ) : (
          <Btn
            title="Salvar"
            background={theme.colors.grey}
            color="#FFF"
            onPress={() => {}}
          />
        )}
      </OptionsButton>
    </Container>
  );
};

RecordAudioModalContent.propTypes = {
  toggleModal: PropTypes.func,
  setMedias: PropTypes.func,
  value: PropTypes.number,
  setAudioCount: PropTypes.func,
};

RecordAudioModalContent.defaultProps = {
  toggleModal: () => {},
  setMedias: () => {},
  value: 1,
  setAudioCount: () => {},
};

export default RecordAudioModalContent;
