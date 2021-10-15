import React, {useState, useEffect} from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import api from 'services/api';
import {FlatList, Alert} from 'react-native';
import {Container, InputText, TextBtn} from './styles';

const SupportForm = () => {
  // Cria listas dos dados do form
  const [questionsFormList, setQuestionsFormList] = useState([]); // Formato: { question: '', id: ''}
  const [questionsStateList, setQuestionsStateList] = useState([]); // Formato: { value: '', isValid: Bool}

  // Faz chamada GET para obter dados do formulário
  const getQuestionsToGetHelp = () => {
    api.get('/community/questionsToGetHelp').then(
      (response) => {
        const listQuestions = response.data;
        const inputList = listQuestions.map(() => ({
          isValid: false,
          value: '',
        }));
        setQuestionsStateList(inputList);
        setQuestionsFormList(listQuestions);
      },
      () => {},
    );
  };

  // Primeira função a ser chamada
  useEffect(() => {
    getQuestionsToGetHelp();
  }, []);

  // Valida formulário
  const formIsValid = () => {
    let isValid = true;
    questionsStateList.some((item) => {
      if (!item.isValid) {
        isValid = false;
        return true;
      }
      return false;
    });
    return isValid;
  };

  // Função chamada ao pressionar o botão de envio
  const onPress = async () => {
    const sendFormList = [];
    for (let cont = 0; cont < questionsFormList.length; cont++) {
      const dadoEnvio = {
        questionId: questionsFormList[cont].id,
        response: questionsStateList[cont].value,
      };
      sendFormList.push(dadoEnvio);
    }
    console.log(sendFormList);
    console.log({answers: sendFormList});
    // try {
    //   await api.post('/community/sendAnswers', "{answers: sendFormList}");
    // } catch (error) {
    //   Alert.alert('Cartografia Social', error.message);
    // }
  };

  // Função chamada cada vez que um Item é alterado
  const onChangeQuestion = (value, index) => {
    const auxList = questionsStateList;
    auxList[index] = value;
    setQuestionsStateList([...auxList]);
  };

  // Renderiza cada Item do Formulário
  const renderItem = ({item, index}) => (
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
            keyExtractor={(item) => item._id}
          />
          <Btn
            disabled={!formIsValid()}
            style={{marginVertical: 50}}
            title="Enviar Formulário"
            onPress={onPress}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default SupportForm;
