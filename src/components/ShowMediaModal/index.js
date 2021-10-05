import React, {useState} from 'react';
import PropTypes from 'prop-types';
import theme from 'theme/theme';
import normalize from 'react-native-normalize';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  Container,
  Image,
  Header,
  OptionsButton,
  Icon,
  Text,
  Media,
  Audio,
  AudioContainer,
} from './styles';
import Btn from '../UI/Btn';

let audioRecorderPlayer = new AudioRecorderPlayer();

const ShowMediaModal = ({media, closeModal}) => {
  const [startPlay, setStartPlay] = useState(false);
  const [recordPlayMinTime, setRecordPlayMinTime] = useState('00');
  const [recordPlaySecTime, setRecordPlaySecTime] = useState('00');

  const displayImage = (uri) => {
    return <Image source={{uri}} />;
  };

  const getTime = (time) => {
    return new Date(time).toISOString().slice(11, -1);
  };

  const onStartPlay = async (path) => {
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

  const onStopPlay = async () => {
    // function to pause an audio
    await audioRecorderPlayer.stopPlayer();
    setStartPlay(false);
  };

  const handleCloseModal = () => {
    onStopPlay();
    audioRecorderPlayer = new AudioRecorderPlayer();
    closeModal();
  };

  const displayAudio = (durationTime, uri) => {
    return (
      <Audio>
        <AudioContainer>
          <Icon size={25} name="clock" />
          <Text
            marginLeft={10}
            fontWeight="bold"
            fontSize={theme.font.sizes.SM}
            mb={2}>
            {`${`00:${recordPlayMinTime}:${recordPlaySecTime}`} / ${durationTime}`}
          </Text>
        </AudioContainer>
        <Btn
          title=""
          icon={startPlay ? 'pause' : 'play-arrow'}
          size={normalize(25)}
          background="#FFF"
          style={{width: '25%', alignItems: 'center', marginTop: normalize(20)}}
          color={theme.colors.primary}
          onPress={() => {
            if (!startPlay) {
              onStartPlay(uri);
            } else {
              onPausePlay();
            }
          }}
        />
      </Audio>
    );
  };
  return (
    <Container>
      <Header>
        <Text fontSize={theme.font.sizes.ML}>Nome</Text>
      </Header>
      <Media>
        {media.type === 'image/jpeg' ? displayImage(media.uri) : null}
        {media.type === 'audio/mpeg'
          ? displayAudio(getTime(media.duration).split('.')[0], media.uri)
          : null}
        {media.type === 'video/mp4' ? (
          <Text fontSize={theme.font.sizes.ML}>{media.uri}</Text>
        ) : null}
      </Media>
      <OptionsButton onPress={handleCloseModal}>
        <Btn
          title="Apagar"
          background="#FFF"
          style={{borderWidth: 0.5, marginBottom: normalize(20)}}
          color={theme.colors.primary}
          onPress={() => {}}
        />
        <Btn
          title="Fechar"
          background="#FFF"
          style={{borderWidth: 0.5}}
          color={theme.colors.primary}
          onPress={handleCloseModal}
        />
      </OptionsButton>
    </Container>
  );
};

ShowMediaModal.propTypes = {
  media: PropTypes.shape({
    type: PropTypes.string,
    uri: PropTypes.string,
    duration: PropTypes.number,
  }),
  closeModal: PropTypes.func,
};

ShowMediaModal.defaultProps = {
  media: {},
  closeModal: () => {},
};

export default ShowMediaModal;
