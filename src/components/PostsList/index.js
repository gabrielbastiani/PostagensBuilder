import React, { useEffect, useState } from 'react';
import {
    Container,
    Name,
    Header,
    Avatar,
    ContentView,
    Content,
    LikeButton,
    Actions,
    Like,
    TimePost,
    AnswerButton,
    TextButton,
    Empity,
    Banner,
    AnswerList,
    NameAnswer,
    AnswerContent,
    BannerAnswer,
    EmpityAnswer,
    AvatarAnswer,
    HeaderAnswer,
    DivAvatar,
    EmpityArea,
    TextEmpity,
    TextTotalAnswers
} from './styles';
import Hr from "react-native-hr-component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';


function PostsList({ data, respostas, userId, refreshingLike }) {

    const navigation = useNavigation();

    const [likePost, setLikePost] = useState(data?.like);
    const [likeAnswer, setLikeAnswer] = useState(Number(respostas[0]?.like));
    const [photoUser, setPhotoUser] = useState('');

    const dateAnswers = respostas?.created_at;
    let answersAmaount = Number(respostas?.length) === 0;
    let totalAnswers = Number(respostas?.length);


    useEffect(() => {
        async function loadPhtoUserPost() {
            try {
                const response = api.get(`/userPhoto?name=${data.name}`);
                setPhotoUser((await response)?.data.photo);
            } catch (error) {
                return console.log(error);
            }
        }
        loadPhtoUserPost();
    }, []);


    async function handleLikePost(id) {

        let docId = `${userId}_${id}`;

        const response = api.get(`/docIdFind?docId=${docId}`);
        const docIds = ((await response)?.data?.docId);

        try {

            if (docId == docIds) {

                await api.put('/deslike', { post_id: id });

                await api.delete(`/deleteDoc?docId=${docId}`);

                setLikePost(data?.like - 1);

                refreshingLike()

                return;

            }

            const user_id = userId;
            const post_id = id;

            await api.post('/docId', { post_id: post_id, user_id: user_id, docId: docId });

            await api.put('/like', { post_id: id });

            setLikePost(data?.like + 1);


        } catch (error) {
            console.log(error.response.data);
        }

        refreshingLike()

    }

    async function handleLikeAnswer(id, like) {

        console.log(like)

        let docIdResponde = `${userId}_${id}`;

        const response = api.get(`/docIdFindAnswer?docIdResponde=${docIdResponde}`);
        const docIdsAnswerss = ((await response)?.data?.docIdResponde);

        try {

            if (docIdResponde == docIdsAnswerss) {

                await api.put('/deslikeAnswer', { postresponde_id: id });

                await api.delete(`/deleteDocAnswer?docIdResponde=${docIdResponde}`);

                setLikeAnswer(like - 1);

                refreshingLike()

                return;

            }

            const user_id = userId;
            const answerId = id;

            await api.post('/docIdAnswer', { postresponde_id: answerId, user_id: user_id, docIdResponde: docIdResponde });

            await api.put('/likeMoreAnswer', { postresponde_id: answerId });

            setLikeAnswer(like + 1);

        } catch (error) {
            console.log(error.response.data);
        }

        refreshingLike()

    }


    function formatTimePost() {
        const datePost = new Date(data.created_at);

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }

    function formatTimeAnswer() {
        const dateAnswer = new Date(dateAnswers);

        return formatDistance(
            new Date(),
            dateAnswer,
            {
                locale: ptBR
            }
        )
    }


    return (
        <Container>
            <Header onPress={() => navigation.navigate("PostsUser", { title: data.name })}>
                {photoUser ? (
                    <Avatar source={{ uri: 'http://192.168.0.147:3333/files/' + photoUser }} />
                ) : (
                    <Avatar source={require('../../assets/avatar.png')} />
                )}

                <Name numberOfLines={1}>
                    {data?.name}
                </Name>
            </Header>

            <ContentView>
                <Content>{data?.description}</Content>
            </ContentView>

            {data.imgPost ? (
                <Banner
                    source={{ uri: 'http://192.168.0.147:3333/files/' + data?.imgPost }} />
            ) : (
                <Empity></Empity>
            )}

            <Actions>
                <LikeButton
                    onPress={() => handleLikePost(data.id, likePost)}>
                    <Like>
                        {likePost === 0 ? '' : likePost}
                    </Like>
                    <MaterialCommunityIcons
                        name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
                        size={20}
                        color="#E52246" />
                </LikeButton>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>

            <AnswerButton onPress={() => navigation.navigate("NewAnswer", { postId: data?.id })}>
                <TextButton>Responder</TextButton>
            </AnswerButton>

            <HeaderAnswer>
                {answersAmaount ? (
                    <EmpityAnswer></EmpityAnswer>
                ) : (
                    <Hr lineColor="black" width={1} text="Respostas abaixo" />
                )}
            </HeaderAnswer>




            {respostas?.map((item) => {
                return (
                    <AnswerList key={item?.id}>
                        {answersAmaount ? (
                            <EmpityArea>
                                <TextEmpity>Área das futuras respsotas!</TextEmpity>
                            </EmpityArea>
                        ) : (
                            <TextTotalAnswers>Total de respsotas = {totalAnswers}</TextTotalAnswers>
                        )}

                        <AnswerContent>
                            {answersAmaount ? (
                                <EmpityAnswer></EmpityAnswer>
                            ) : (
                                <DivAvatar>
                                    <AvatarAnswer source={{ uri: 'http://192.168.0.147:3333/files/' + photoUser }} />
                                </DivAvatar>
                            )}

                            <NameAnswer numberOfLines={1}>
                                {item?.name}
                            </NameAnswer>
                        </AnswerContent>

                        <AnswerContent>
                            {item?.answer}
                        </AnswerContent>

                        {item?.imgAnswer ? (
                            <BannerAnswer
                                source={{ uri: 'http://192.168.0.147:3333/files/' + item?.imgAnswer }} />
                        ) : (
                            <EmpityAnswer></EmpityAnswer>
                        )}

                        <Actions>
                            {answersAmaount ? (
                                <EmpityAnswer></EmpityAnswer>
                            ) : (
                                <LikeButton
                                    onPress={() => handleLikeAnswer(item?.id, item?.like)} >
                                    <Like>
                                        {Number(item?.like) === 0 ? '' : Number(item?.like)}
                                    </Like>
                                    <MaterialCommunityIcons
                                        name={Number(item?.like) === 0 ? 'heart-plus-outline' : 'cards-heart'}
                                        size={17}
                                        color="#E52246" />
                                </LikeButton>
                            )}

                            <TimePost>
                                {/* {formatTimeAnswer()} */}
                            </TimePost>
                        </Actions>
                    </AnswerList>
                )
            })}
        </Container>
    );
}

export default PostsList;