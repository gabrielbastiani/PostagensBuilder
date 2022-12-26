import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 8px;
  margin: 8px 2%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
  elevation: 3;
  padding: 11px;
`;

export const Header = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Name = styled.Text`
  color: #353840;
  font-size: 18px;
  font-weight: bold;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 6px;
`;

export const ContentView = styled.View``;

export const Content = styled.Text`
  color: #353840;
  margin: 4px 0;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

export const LikeButton = styled.TouchableOpacity`
  width: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Like = styled.Text`
  color: #e52246;
  margin-right: 6px;
`;

export const TimePost = styled.Text`
  color: #121212;
`;

export const AnswerButton = styled.TouchableOpacity`
  background-color: orange;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 15px 0;
`;

export const TextButton = styled.Text`
  font-size: 15px;
  color: black;
  justify-content: center;
  align-items: center;
`;

export const Empity = styled.View`
  content: '';
`;

export const Banner = styled.Image`
  width: 300px;
  height: 140px;
  border-radius: 10px;
  object-fit: contain;
  margin: 25px 0;
`;

export const AnswerList = styled.View`
  display: flex;
  margin-top: 8px;
  margin: 8px 2%;
  background-color: #bcbcbc;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
  elevation: 3;
  padding: 11px;
  width: 300px;
`;

export const NameAnswer = styled.Text`
  color: black;
  font-size: 13px;
`;

export const AnswerContent = styled.Text`
  color: black;
  font-size: 12px;
  margin: 8px 0;
  align-items: center;
`;

export const EmpityAnswer = styled.View`
  content: '';
`;

export const BannerAnswer = styled.Image`
  width: 270px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
  margin: 25px 0;
`;

export const AvatarAnswer = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 8px;
`;

export const HeaderAnswer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const DivAvatar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const EmpityArea = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextTotalAnswers = styled.Text`
  color: black;
  font-size: 11px;
`;

export const TextEmpity = styled.Text`
  color: black;
  text-align: center;
  font-size: 16px;
  margin-bottom: -85px;
  margin-top: -15px;
`;