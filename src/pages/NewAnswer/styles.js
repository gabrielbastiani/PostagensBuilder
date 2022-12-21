import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #404349;
`;

export const Input = styled.TextInput`
    background-color: transparent;
    margin: 10px;
    color: #FFF;
    font-size: 20px;
`;

export const Button = styled.TouchableOpacity`
    background-color: orange;
    margin-right: 7px;
    padding: 5px 12px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;

export const UploadButton = styled.TouchableOpacity`
  background-color: #fff;
  width: 325px;
  height: 165px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: 8;
  margin-left: 15px;
`;

export const UploadText = styled.Text`
  font-size: 55px;
  position: absolute;
  color: orange;
  opacity: 0.5;
  z-index: 99;
`;

export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;