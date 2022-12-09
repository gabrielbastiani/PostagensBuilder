import React, { useState } from 'react';
import { Container, TextApp, Logo, Input, Button, ButtonText } from '../Login/styles';
import { Text } from 'react-native';
import { api } from '../../services/api';


function RecoverySenha() {

  const [email, setEmail] = useState("");


  async function handleRecovery(event) {
    event.preventDefault();

    try {
      if (email === '') {
        alert("PREENCHA TODOS OS CAMPOS PARA CADASTRAR!")
        return;
      }

      await api.post('/recover', { email: email });

      alert('Verifique sua caixa de e-mail')

    } catch (error) {
      console.log(error);
      alert('Erro ao enviar e-mail!')
    }

    setEmail('');

  }


  return (
    <Container>
      <Logo source={require('../../assets/Logo.png')} />

      <TextApp>
        <Text>Rede Social Builder</Text>
      </TextApp>

      <Input
        placeholder="seuemail@email.com"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Button
        onPress={handleRecovery}
      >
        <ButtonText>Recuperar</ButtonText>
      </Button>

    </Container>
  )
}

export default RecoverySenha;