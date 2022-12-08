import styled from 'styled-components/native';


export const TextApp = styled.Text`
  color: orange;
  margin-bottom: 15px;
  font-size: 17px;
`;

export const Logo = styled.Image`
  margin-bottom: 15px;
  height: 155px;
  width: 155px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #36393f;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 55px;
  font-weight: bold;
  font-style: italic;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "grey",
})
`
  color: black;
  width: 80%;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 17px;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: orange;
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const SignUpText = styled.Text`
  color: #ddd;
  font-size: 15px;
`;

export const RecoveryDiv = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;