import React, {useState, useEffect} from 'react';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import api from 'services/api';
import {FlatList, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Container, InputText} from './styles';

const DynamicForm = ({navigation}) => {
  // Cria listas dos dados do form
  const [questionsFormList, setQuestionsFormList] = useState([]); // Formato: { question: '', id: ''}
  const [questionsStateList, setQuestionsStateList] = useState([]);
  // fieldtype /formName / id / optional / placeholder/ question / validationRegex
  // Formato: { value: '', isValid: Bool}
  const [isLoading, setIsLoading] = useState(true);

  // Faz chama POST para obter dados do formulário
  const getQuestionsToCreateCommunity = () => {
    api
      .get('/community/questionsToCreateCommunity')
      .then((response) => {
        const listQuestions = response.data;
        const inputList = listQuestions.map(() => ({
          isValid: false,
          value: '',
        }));
        setQuestionsStateList(inputList);
        setQuestionsFormList(listQuestions);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert(
          'Erro ao gerar formulário!',
          [
            {
              text: 'Voltar',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      });
  };

  // Primeira função a ser chamada
  useEffect(() => {
    setIsLoading(true);
    getQuestionsToCreateCommunity();
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
    await api
      .post('/community/sendAnswers', sendFormList)
      .then(() => {
        Alert.alert(
          'Formulário Enviado! ',
          'Aguarde e logo a cartografia social entrará em contato. Aproveite nosso modo demonstração enquanto isso.',
          [
            {
              text: 'Voltar',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(() => {
        Alert.alert(
          'Atenção',
          'Erro ao salvar respostas. Tente novamente mais tarde!',
        );
      });
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
      <InputText>
        {index + 1}
        {'. '}
        {item.question}
      </InputText>
      <Input
        label={`${item.placeholder}`}
        value={questionsStateList[index].value}
        onChange={(value) => onChangeQuestion(value, index)}
        errorMessage={
          required(questionsFormList[index], questionsStateList[index].value)
            .isValid
        }
        externalError={
          required(questionsFormList[index], questionsStateList[index].value)
            .errorText
        }
      />
    </>
  );

  const renderButtom = () => (
    <Btn
      disabled={!formIsValid()}
      style={{marginVertical: 50}}
      title="Enviar Formulário"
      onPress={onPress}
    />
  );

  return (
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} textContent="Carregando..." />
      ) : (
        <FlatList
          data={questionsFormList}
          renderItem={renderItem}
          keyExtractor={(item) => {
            return item.id;
          }}
          ListFooterComponent={renderButtom}
        />
      )}
    </Container>
  );
};

export default DynamicForm;
