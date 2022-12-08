import React, { useState, useContext } from 'react';
import { Container, TextApp, Logo, Input, Button, ButtonText, SignUpButton, SignUpText } from '../Login/styles';
import { Text, ActivityIndicator } from 'react-native';
import { api } from '../../services/api';
import { Auth } from '../../contexts/Auth';


function RecoverySenha() {

  const { signIn, loadingAuth } = useContext(Auth);

  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  function toggleLogin() {
    setLogin(!login);
    setEmail('');
    setPassword('');
  }

  async function handleSignIn() {
    if (email === '' || password === '') {
      alert("PREENCHA TODOS OS CAMPOS!")
      return;
    }

    await signIn({ email, password });

  }

  async function handleRecovery(event) {
    event.preventDefault();

    try {
      if (email === '') {
        alert("PREENCHA TODOS OS CAMPOS PARA CADASTRAR!")
        return;
      }

      setLoading(true);

      await api.post('/recover', {email: email});

      alert('Verifique sua caixa de e-mail')

    } catch (error) {
      console.log(error);
      alert('Erro ao enviar e-mail!')
    }

    setLoading(false);

  }


  if (login) {
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

        <Input
          placeholder="******"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        <Button onPress={handleSignIn}>
          <ButtonText>
          { loadingAuth ? (
            <ActivityIndicator size={25} color="#FFF"/>
          ) : (
            <Text>Acessar</Text>
          )}
          </ButtonText>
        </Button>

        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Perdeu sua senha?</SignUpText>
        </SignUpButton>

      </Container>
    )
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
        loading={loading}
        >
        <ButtonText>Cadastrar</ButtonText>
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Voltar para o login</SignUpText>
      </SignUpButton>

    </Container>
  )
}

export default RecoverySenha;