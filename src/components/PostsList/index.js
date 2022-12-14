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
    TimePost
} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { api } from '../../services/api';


function PostsList({ data, userId }) {

    const [likePost, setLikePost] = useState(data?.like);

    
    async function handleLikePost(id) {
        try {
            const docId = `${userId}_${id}`;

            const docs = await api.get(`/docIdFind?docId=${docId}`);

            const doc = docs.data.allDocId;

            console.log(doc)
            
            if (!doc) {
                const docId = `${userId}_${id}`;
                await api.put('/deslike', { post_id: id });

                await api.delete(`/deleteDoc?docId=${docId}`);

                setLikePost(data.like - 1);

                return;

            } else if (docId) {
                const user_id = userId;
                const post_id = id;
                await api.post('/docId', { post_id: post_id, user_id: user_id, docId: docId });

                await api.put('/like', { post_id: id });

                setLikePost(data.like + 1);

                return;
            }
        } catch (error) {
            console.log(error.response.data)
        }

    }


    /* async function handleLikePost(id) {
        try {
            const docId = `${userId}_${id}`;
            const user_id = userId;

            //Checar se o post já foi curtido
            const {data} = await api.get(`/docIdFind?docId=${docId}`);

            const doc = data?.allDocId.docId;

            console.log(doc)
           

            if (docId) {
                //Que dizer que já curtiu esse post, entao precisamos remover o like
                await api.put('/deslike', { post_id: id });

                await api.delete(`/deleteDoc?docId=${docId}`);

                setLikePost(data.like - 1);

                return;
            }

            // Precisamos dar o like no post
            const post_id = id;
            await api.post('/docId', { post_id: post_id, user_id: user_id, docId: docId });

            await api.put('/like', { post_id: id });

            setLikePost(data.like + 1);

        } catch (error) {
            console.log(error.response.data)
        }

    } */



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
            <Header>
                {data.photo ? (
                    <Avatar source={{ uri: data.photo }} />
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

            <Actions>
                <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
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
        </Container>
    );
}

export default PostsList;