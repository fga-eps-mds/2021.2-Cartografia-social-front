import React, {useState} from 'react';
import Btn from 'components/UI/Btn';
import Tutorial from 'components/Tutorial';
import {Container, Header, HeaderText} from './styles';

const Tutoriais = () => {
  const [mostrarTutorial, setMostrarTutorial] = useState(false);

  return (
    <>
      <Header>
        <HeaderText>Tutoriais</HeaderText>
      </Header>
      <Container>
        <Btn
          style={{marginVertical: 50}}
          title="Marcação de Áreas"
          onPress={() => {
            setMostrarTutorial(false);
            setMostrarTutorial(true);
          }}
        />
        {mostrarTutorial === true && <Tutorial />}
      </Container>
    </>
  );
};

export default Tutoriais;
