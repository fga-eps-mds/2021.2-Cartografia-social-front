import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, } from 'react-native';
import theme from 'theme/theme';
import {Header, Title} from './styles';

const Tutorial = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    imagem: {
      width: 200,
      height: 200,
      marginBottom: 15,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Header>
              <Title fontSize={theme.font.sizes.ML}>Tutorial</Title>
            </Header>
            <Text>
              Ao marcar pontos, deve-se fazê-lo de modo que o ponto atual e o
              próximo ponto a ser marcado compartilhem a mesma aresta do
              polígono que formará a área.
            </Text>
            <Text style={styles.textStyle}>Forma correta</Text>
            {/* <Image
              style={styles.imagem}
              source={require('../assets/MarcacaoDeAreaCorreta.gif')}
            /> */}
            <Text style={styles.textStyle}>Forma incorreta</Text>
            {/* <Image
              style={styles.imagem}
              source={require('../assets/MarcacaoDeAreaIncorreta.gif')}
            /> */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}>
              <Text style={{...styles.textStyle, color: 'white'}}>
                Hide Modal
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Tutorial;
