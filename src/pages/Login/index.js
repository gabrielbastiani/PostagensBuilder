import React from 'react';
import {Container, Logo, Input, Button, ButtonText, SignUpButton, SignUpText} from './styles';

function Login(){
    const [login, setLogin] = useState(false);
  
  
    function toggleLogin(){
      setLogin(!login)
    }
  
  
    if(login){
      return(
        <Container>
          <Logo source={require('../../assets/Logo.png')} />
    
          <Input
            placeholder="seuemail@teste.com"
          />
    
          <Input
            placeholder="******"
          />
    
          <Button>
            <ButtonText>Acessar</ButtonText>
          </Button>
    
          <SignUpButton onPress={toggleLogin}>
            <SignUpText>Criar uma conta</SignUpText>
          </SignUpButton>
         
        </Container>
      )
    }
  
    return(
      <Container>
        <Logo source={require('../../assets/Logo.png')} />
  
        <Input
          placeholder="Seu nome"
        />
  
        <Input
          placeholder="seuemail@teste.com"
        />
  
        <Input
          placeholder="******"
        />
  
        <Button>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
  
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Já tenho uma conta</SignUpText>
        </SignUpButton>
       
      </Container>
    )
  }
  
  export default Login;