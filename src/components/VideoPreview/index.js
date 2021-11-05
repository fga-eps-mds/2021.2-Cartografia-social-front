/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import normalize from 'react-native-normalize';
import theme from 'theme/theme';
import {MediaContainer, MediaButton, DeleteButton, Icon} from '../../styles';

import {ImageBackground} from './styles';

const VideoPreview = ({item, handleShowMedia, DeleteMedia, hasDelete}) => {
  return (
    <MediaContainer bigger={hasDelete || null}>
      <MediaButton onPress={() => handleShowMedia(item.type, item.uri || item.url)}>
        <ImageBackground
          source={{uri: item.thumb}}
          imageStyle={{borderRadius: 7}}>
          <Icon size={normalize(20)} name="play" color={theme.colors.primary} />
        </ImageBackground>
      </MediaButton>
      {hasDelete ? (
        <DeleteButton onPress={() => DeleteMedia(item.uri)}>
          <Icon size={normalize(20)} name="trash" color="#FF0000" />
        </DeleteButton>
      ) : null}
    </MediaContainer>
  );
};

VideoPreview.propTypes = {
  item: PropTypes.shape({
    uri: PropTypes.string,
    type: PropTypes.string,
    thumb: PropTypes.string,
  }),
  handleShowMedia: PropTypes.func,
  DeleteMedia: PropTypes.func,
  hasDelete: PropTypes.bool,
};

VideoPreview.defaultProps = {
  item: {},
  handleShowMedia: () => null,
  DeleteMedia: () => null,
  hasDelete: true,
};

export default VideoPreview;
