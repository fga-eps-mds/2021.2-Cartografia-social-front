import React from 'react';
import PropTypes from 'prop-types';
import normalize from 'react-native-normalize';
import {Text} from 'components/UI';
import {MediaContainer, MediaButton, DeleteButton, Icon} from '../../styles';

import {AudioContainer} from './styles';

const AudioPreview = ({
  item,
  handleShowMedia,
  audioCount,
  setAudioCount,
  DeleteMedia,
  hasDelete,
}) => {
  const getTime = (time) => {
    return new Date(time).toISOString().slice(11, -1);
  };
  return (
    <MediaContainer bigger={hasDelete || null}>
      <MediaButton
        onPress={() =>
          handleShowMedia(item.type, item.uri || item.url, item.duration)
        }>
        <AudioContainer>
          <Icon size={normalize(20)} name="microphone" color="#2a3c46" />
          <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>
            {getTime(item.duration).split('.')[0]}
          </Text>
        </AudioContainer>
      </MediaButton>
      {hasDelete ? (
        <DeleteButton
          onPress={() => {
            DeleteMedia(item);
            setAudioCount(audioCount - 1);
          }}>
          <Icon size={normalize(20)} name="trash" color="#FF0000" />
        </DeleteButton>
      ) : null}
    </MediaContainer>
  );
};

AudioPreview.propTypes = {
  item: PropTypes.shape({
    uri: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.number,
  }),
  handleShowMedia: PropTypes.func,
  audioCount: PropTypes.number,
  setAudioCount: PropTypes.func,
  DeleteMedia: PropTypes.func,
  hasDelete: PropTypes.bool,
};

AudioPreview.defaultProps = {
  item: {},
  handleShowMedia: () => null,
  audioCount: 0,
  setAudioCount: () => null,
  DeleteMedia: () => null,
  hasDelete: true,
};

export default AudioPreview;
