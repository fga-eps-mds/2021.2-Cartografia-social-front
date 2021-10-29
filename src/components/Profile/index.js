import React, {useState} from 'react';
import ScrollView from 'components/UI/ScrollView';
import {Container, Header, HeaderText} from './styles';

const Profile = () => {
  return (
    <>
      <Header>
        <HeaderText my={3}>Perfil de usuário</HeaderText>
      </Header>
      <ScrollView>
        <Container />
      </ScrollView>
    </>
  );
};

export default Profile;
