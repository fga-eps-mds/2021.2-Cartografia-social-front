/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import normalize from 'react-native-normalize';
import {Text} from 'components/UI';
import {MediaContainer, MediaButton, DeleteButton, Icon} from '../../styles';

const DocumentPreview = ({item, handleShowMedia, DeleteMedia, hasDelete}) => {
  return (
    <MediaContainer bigger={hasDelete || null}>
      <MediaButton
        onPress={() =>
          handleShowMedia(item.type, item.uri || item.url, item.duration)
        }
        style={{borderWidth: 1, borderRadius: 7, padding: 5}}>
        <Icon size={normalize(40)} name="file-pdf" color="#2a3c46" />
        <Text style={{fontSize: normalize(15), color: '#2a3c46'}}>PDF</Text>
        <Text
          numberOfLines={1}
          style={{fontSize: normalize(15), color: '#2a3c46'}}>
          {item.fileName}
        </Text>
      </MediaButton>
      {hasDelete ? (
        <DeleteButton onPress={() => DeleteMedia(item)}>
          <Icon size={normalize(20)} name="trash" color="#FF0000" />
        </DeleteButton>
      ) : null}
    </MediaContainer>
  );
};

DocumentPreview.propTypes = {
  item: PropTypes.shape({
    uri: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.number,
    fileName: PropTypes.string,
  }),
  handleShowMedia: PropTypes.func,
  DeleteMedia: PropTypes.func,
  hasDelete: PropTypes.bool,
};

DocumentPreview.defaultProps = {
  item: {},
  handleShowMedia: () => null,
  DeleteMedia: () => null,
  hasDelete: true,
};

export default DocumentPreview;
