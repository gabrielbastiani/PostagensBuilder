import React, { useState, useContext } from 'react';
import { Container, TextApp, Logo, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles';
import { Text, ActivityIndicator } from 'react-native';
import { api } from '../../services/api';
import { Auth } from '../../contexts/Auth';


function Login() {

  const { signIn, loadingAuth } = useContext(Auth);

  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  function toggleLogin() {
    setLogin(!login);
    setName('');
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

  async function handleSignUp(event) {
    event.preventDefault();

    try {
      if (name === '' || email === '' || password === '') {
        alert("PREENCHA TODOS OS CAMPOS PARA CADASTRAR!")
        return;
      }

      setLoading(true);

      await api.post('/users', {name: name, email: email, password: password});

      alert('Acesse seu email para confirmar seu cadastro!')

    } catch (error) {
      console.log(error);
      alert('Erro ao cadastrar!')
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
          <SignUpText>Criar uma conta</SignUpText>
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
        placeholder="Seu nome"
        autoCorrect={false}
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
      />

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

      <Button
        onPress={handleSignUp}
        loading={loading}
        >
        <ButtonText>Cadastrar</ButtonText>
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>

    </Container>
  )
}

export default Login;