import React, { useEffect, useState, useContext } from 'react';
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
    TextTotalAnswers,
    ModalContainer,
    ButtonBack,
    ButtonText,
    TextAviso,
    Button,
    Delete,
    TextDelete,
    Edit,
    EditDescription,
    Input,
    EditAnswer,
    EditAnswerText
} from './styles';
import Hr from "react-native-hr-component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { Modal, Platform } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { auth } from "../../contexts/auth";


function PostsList({ data, respostas, userId, refreshingLike }) {

    const { user } = useContext(auth);
    const navigation = useNavigation();

    const [likePost, setLikePost] = useState(data?.like);
    const [photoUser, setPhotoUser] = useState('');
    const [open, setOpen] = useState(false);
    const [openAnswer, setOpenAnswer] = useState(false);
    const [openDescription, setOpenDescription] = useState(false);
    const [description, setDescription] = useState(data?.description);
    const [openAnswerEdit, setOpenAnswerEdit] = useState(false);
    const [answer, setAnswer] = useState('');

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

                refreshingLike();

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

        refreshingLike();

    }

    async function handleLikeAnswer(id) {

        let docIdResponde = `${userId}_${id}`;

        const response = api.get(`/docIdFindAnswer?docIdResponde=${docIdResponde}`);
        const docIdsAnswerss = ((await response)?.data?.docIdResponde);

        try {

            if (docIdResponde == docIdsAnswerss) {

                await api.put('/deslikeAnswer', { postresponde_id: id });

                await api.delete(`/deleteDocAnswer?docIdResponde=${docIdResponde}`);

                refreshingLike();

                return;

            }

            const user_id = userId;
            const answerId = id;

            await api.post('/docIdAnswer', { postresponde_id: answerId, user_id: user_id, docIdResponde: docIdResponde });

            await api.put('/likeMoreAnswer', { postresponde_id: answerId });

        } catch (error) {
            console.log(error.response.data);
        }

        refreshingLike();

    }

    function formatTimePost() {
        const datePost = new Date(data?.created_at);

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }

    async function handleDelete(id) {
        try {
            if (data.name === user.name) {

                await api.delete(`/deletePost?post_id=${id}`);

                alert("POST DELETADO COM SUCESSO!!!");

                refreshingLike();

                setOpen(false);

                return;

            } else {
                alert("ESSE POST NÃO É SEU, NÃO PODE DELETAR!!!");
                setOpen(false);
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function handleDeleteAnswer(id, name) {
        try {
            if (name === user.name) {

                await api.delete(`/deleteAnswer?postresponde_id=${id}`);

                alert("RESPOSTA DELETADA COM SUCESSO!!!");

                refreshingLike();

                setOpenAnswer(false);

                return;

            } else {
                alert("ESSA RESPOSTA NÃO É SUA, NÃO PODE DELETAR!!!");
                setOpenAnswer(false);
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function handleEditDescription(id) {
        try {
            if (data.name === user.name) {

                await api.put(`/descriptionUpdate?post_id=${id}`, { description: description });

                alert("TEXTO DA POSTAGEM EDITADO COM SUCESSO!!!");

                refreshingLike();

                setOpenDescription(false);

                return;

            } else {
                alert("ESSA POSTAGEM NÃO É SUA PARA QUE POSSA EDITAR!!!");
                setOpenDescription(false);
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function handleEditAnswer(id, name) {
        try {
            if (name === user.name) {

                await api.put(`/answerDesc?postresponde_id=${id}`, { answer: answer });

                alert("TEXTO DA RESPOSTA EDITADO COM SUCESSO!!!");

                refreshingLike();

                setOpenAnswer(false);

                return;

            } else {
                alert("ESSA RESPOSTA NÃO É SUA PARA QUE POSSA EDITAR!!!");
                setOpenAnswer(false);
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }


    return (
        <Container>
            <Header onPress={() => navigation.navigate("PostsUser", { title: data?.name })}>
                {photoUser ? (
                    <Avatar source={{ uri: 'https://apipostagens.builderseunegocioonline.com.br/files/' + photoUser }} />
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
            
            {data?.name === user?.name ? (
                <EditDescription onPress={() => setOpenDescription(true)}>
                    <MaterialCommunityIcons
                        name={'file-edit-outline'}
                        size={18}
                        color="#E52246"
                    />
                    <Edit>Editar texto...</Edit>
                </EditDescription>
            ) : (
                <Empity></Empity>
            )}

            {data.imgPost ? (
                <Banner
                    source={{ uri: 'https://apipostagens.builderseunegocioonline.com.br/files/' + data?.imgPost }} />
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

                {data?.name === user?.name ? (
                    <Delete onPress={() => setOpen(true)}>
                        <MaterialCommunityIcons
                            name={'delete'}
                            size={22}
                            color="#E52246"
                        />
                        <TextDelete>Deletar</TextDelete>
                    </Delete>
                ) : (
                    <Empity></Empity>
                )}

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
                    <Hr lineColor="black" width={1} text="Respostas dessa postagem abaixo" />
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

                        <AnswerContent onPress={() => navigation.navigate("PostsUser", { title: item?.name })}>
                            {item?.photo ? (
                                <AvatarAnswer source={{ uri: 'https://apipostagens.builderseunegocioonline.com.br/files/' + item?.photo }} />
                            ) : (
                                <DivAvatar>
                                    <Avatar source={require('../../assets/avatar.png')} />
                                </DivAvatar>
                            )}

                            <NameAnswer numberOfLines={1}>
                                {item?.name}
                            </NameAnswer>
                        </AnswerContent>

                        <AnswerContent>
                            {item?.answer}
                        </AnswerContent>

                        {item?.name === user?.name ? (
                            <EditAnswer onPress={() => setOpenAnswerEdit(true)}>
                                <MaterialCommunityIcons
                                    name={'file-edit-outline'}
                                    size={16}
                                    color="#E52246"
                                />
                                <EditAnswerText>Editar texto...</EditAnswerText>
                            </EditAnswer>
                        ) : (
                            <Empity></Empity>
                        )}

                        {item?.imgAnswer ? (
                            <BannerAnswer
                                source={{ uri: 'https://apipostagens.builderseunegocioonline.com.br/files/' + item?.imgAnswer }} />
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

                            {item?.name === user?.name ? (
                                <Delete onPress={() => setOpenAnswer(true)}>
                                    <MaterialCommunityIcons
                                        name={'delete'}
                                        size={17}
                                        color="#E52246"
                                    />
                                    <TextDelete>Deletar</TextDelete>
                                </Delete>
                            ) : (
                                <Empity></Empity>
                            )}

                            <TimePost>
                                {formatDistance(subDays(new Date(item?.created_at), 0), new Date(), { addSuffix: true, locale: ptBR })}
                            </TimePost>
                        </Actions>

                        <Modal visible={openAnswer} animationType="slide" transparent={true}>
                            <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
                                <ButtonBack onPress={() => setOpenAnswer(false)}>
                                    <Feather
                                        name="arrow-left"
                                        size={22}
                                        color="#121212"
                                    />
                                    <ButtonText color="#121212">Voltar</ButtonText>
                                </ButtonBack>

                                <TextAviso>Você deseja mesmo deletar essa resposta?</TextAviso>

                                <Button bg="red" onPress={() => handleDeleteAnswer(item?.id, item?.name)}>
                                    <ButtonText color="#FFF">Deletar Resposta</ButtonText>
                                </Button>


                            </ModalContainer>
                        </Modal>

                        <Modal visible={openAnswerEdit} animationType="slide" transparent={true}>
                            <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
                                <ButtonBack onPress={() => setOpenAnswerEdit(false)}>
                                    <Feather
                                        name="arrow-left"
                                        size={22}
                                        color="#121212"
                                    />
                                    <ButtonText color="#121212">Voltar</ButtonText>
                                </ButtonBack>

                                <TextAviso>Edite abaixo o texto da sua resposta se desejar</TextAviso>

                                <Input
                                    placeholder={item?.answer}
                                    value={answer}
                                    onChangeText={(text) => setAnswer(text)}
                                />

                                <Button bg="red" onPress={() => handleEditAnswer(item?.id, item?.name, item?.answer)}>
                                    <ButtonText color="#FFF">Salvar edição</ButtonText>
                                </Button>
                            </ModalContainer>
                        </Modal>
                    </AnswerList>
                )
            })}




            <Modal visible={open} animationType="slide" transparent={true}>
                <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
                    <ButtonBack onPress={() => setOpen(false)}>
                        <Feather
                            name="arrow-left"
                            size={22}
                            color="#121212"
                        />
                        <ButtonText color="#121212">Voltar</ButtonText>
                    </ButtonBack>

                    <TextAviso>Você deseja mesmo deletar esse post?</TextAviso>

                    <Button bg="red" onPress={() => handleDelete(data.id)}>
                        <ButtonText color="#FFF">Deletar</ButtonText>
                    </Button>
                </ModalContainer>
            </Modal>

            <Modal visible={openDescription} animationType="slide" transparent={true}>
                <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
                    <ButtonBack onPress={() => setOpenDescription(false)}>
                        <Feather
                            name="arrow-left"
                            size={22}
                            color="#121212"
                        />
                        <ButtonText color="#121212">Voltar</ButtonText>
                    </ButtonBack>

                    <TextAviso>Edite abaixo o texto da sua postagem se desejar</TextAviso>

                    <Input
                        placeholder={data?.description}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <Button bg="red" onPress={() => handleEditDescription(data.id)}>
                        <ButtonText color="#FFF">Salvar edição</ButtonText>
                    </Button>
                </ModalContainer>
            </Modal>

        </Container>
    );
}

export default PostsList;