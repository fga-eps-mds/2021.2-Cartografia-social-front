import React, {useState} from 'react';
import {Modal, StyleSheet} from 'react-native';
import theme from 'theme/theme';
import Text from 'components/UI/Text';
import Btn from 'components/UI/Btn';
import {ScrollView, View} from 'components/UI';
import {
  Header,
  MarcacaoDeAreaCorreta,
  MarcacaoDeAreaIncorreta,
  Title,
} from './styles';

const Tutorial = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const styles = StyleSheet.create({
    modalView: {
      bottom:20,
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
        <ScrollView>
          <View style={{marginTop: 60}}>
            <View style={styles.modalView}>
              <Header>
                <Title fontSize={theme.font.sizes.ML}>Como marcar áreas?</Title>
              </Header>
              <Text alignSelf="center" fontSize={theme.font.sizes.SM} m={3}>
                    Ao marcar pontos, atente-se para:
              </Text>
              <Text alignSelf="center" fontSize={theme.font.sizes.SM} m={3}>
                    1. A área demarcada seguirá a ordem de marcação dos pontos.
              </Text>
              <Text alignSelf="center" fontSize={theme.font.sizes.SM} m={3}>
                    2. O ponto marcado sempre será ligado ao ponto anterior
                    e formando assim o mesmo lado da área demarcada.
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  alignSelf="center"
                  fontSize={theme.font.sizes.M}
                  fontWeight="bold"
                  m={3}>
                  Forma correta
                </Text>
                <Text
                  alignSelf="center"
                  fontSize={theme.font.sizes.M}
                  fontWeight="bold"
                  m={3}>
                  Forma incorreta
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MarcacaoDeAreaCorreta />
                <MarcacaoDeAreaIncorreta />
              </View>
              <Btn
                style={{marginVertical: 10}}
                title="Fechar"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Tutorial;
