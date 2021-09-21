import React, { useState, useEffect } from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import auth from '@react-native-firebase/auth';
import { Container, Header, HeaderText, InputText, TextBtn } from './styles';
import api from 'services/api';
import { FlatList } from 'react-native';
import { objectOf } from 'prop-types';

// import {Alert} from 'react-native';
// import api from 'services/api';
// import {useDispatch} from 'react-redux';
// import * as Actions from 'store/actions';

const DynamicForm = ({ navigation }) => {

  const [questionsFormList, setQuestionsFormList] = useState([]);
  const [questionsStateList, setQuestionsStateList] = useState([]);

  const getQuestionsToCreateCommunity = () => {
    api.get('/community/questionsToCreateCommunity').then((response) => {
      const listQuestions = response.data;
      const inputList = listQuestions.map((item) => ({
        isValid: false,
        value: '',
      }));
      setQuestionsStateList(inputList);
      setQuestionsFormList(listQuestions);
    }, () => { });
  };

  useEffect(() => {
    getQuestionsToCreateCommunity();
  }, []);

  const formIsValid = () => {
    let isValid = true;
    questionsStateList.some((item, idx) => {
      if (!item.isValid) {
        isValid = false;
        return true;
      }
      return false;
    })
    return isValid;
  };

  const onPress = async () => {
    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        navigation.navigate('Map');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const onChangeQuestion = (value, index) => {
    console.tron.log(questionsStateList, value);
    const auxList = questionsStateList;
    auxList[index] = value;
    setQuestionsStateList([...auxList]);
  };

  const renderItem = ({ item, index }) => (
    <>
      <InputText>{item.question}</InputText>
      <Input
        label={`Insira ${item.question}`}
        onChange={(value) => onChangeQuestion(value, index)}
        // value={questionsStateList[index].value}
        autoCapitalize="words"
        rules={[required]}
      />
    </>
  );

  return (
    <>
      <ScrollView>
        <Container>

          <FlatList
            data={questionsFormList}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />

          <TextBtn onPress={() => null}>Enviar Formulário</TextBtn>
          <Btn
            disabled={!formIsValid()}
            style={{ marginVertical: 50 }}
            title="Entrar"
            onPress={onPress}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default DynamicForm;
