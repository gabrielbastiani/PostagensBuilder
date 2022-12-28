import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  margin: 5px 10px;
  background-color: #222227;
  padding: 10px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 13px;
`;

export const Name = styled.Text`
  color: #FFF;
  font-size: 17px;
`;