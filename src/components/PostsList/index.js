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
    Banner
} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';


function PostsList({ data, userId, refreshingLike }) {

    const navigation = useNavigation();
    const [likePost, setLikePost] = useState(data?.like);
    const [docIds, setDocIds] = useState('');

    const post_id = data.id;

    useEffect(() => {
            async function loadDocId() {
                try {
                    const docId = `${userId}_${post_id}`;
                    const response = api.get(`/docIdFind?docId=${docId}`);
                    setDocIds((await response).data.docId);
                } catch (error) {
                    return
                }
            }
            loadDocId();
    }, []);


    async function handleLikePost(id) {

        let docId = `${userId}_${id}`;

        try {
    
            if (docId == docIds) {

                await api.put('/deslike', { post_id: id });

                await api.delete(`/deleteDoc?docId=${docId}`);

                setLikePost(data.like - 1);

                refreshingLike()

                return;

            }

            const user_id = userId;
            const post_id = id;

            await api.post('/docId', { post_id: post_id, user_id: user_id, docId: docId });

            await api.put('/like', { post_id: id });

            setLikePost(data.like + 1);


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

    return (
        <Container>
            <Header onPress={() => navigation.navigate("PostsUser", {title: data.name})}>
                {data.photo ? (
                    <Avatar source={{ uri: 'http://localhost:3333/files/' + photo }} />
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
                source={{ uri: 'http://localhost:3333/files/' + data?.imgPost }}
                />
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
                        color="#E52246"
                    />
                </LikeButton>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>

            <AnswerButton onPress={() => navigation.navigate("NewAnswer", {postId: post_id} )}>
                <TextButton>Responder</TextButton>
            </AnswerButton>

        </Container>
    );
}

export default PostsList;