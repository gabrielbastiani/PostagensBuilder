import React, { useLayoutEffect, useState, useCallback, useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../../services/api";
import { auth } from '../../contexts/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
} from '../../components/PostsList/styles';


function PostsUser() {

    const route = useRoute();
    const navigation = useNavigation();
    const { user } = useContext(auth);
    const [title, setTitle] = useState(route.params?.title);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [created_at, setCreated_at] = useState([Number]);
    const [description, setDescription] = useState('');
    const [likePost, setLikePost] = useState(Number);
    const [posts, setPosts] = useState([]);
    const [docIds, setDocIds] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingRefresh, setLoadingRefresh] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: title === '' ? '' : title
        })
    }, [navigation, title]);

    useEffect(
        useCallback(() => {
            let isActive = true;
            async function fetchPosts() {
                const allPosts = await api.get(`/postsUser?name=${title}`);
                if (isActive) {
                    setPosts(allPosts?.data);
                    setUserId(allPosts?.data[0].id);
                    setName(allPosts?.data[0].name);
                    setPhoto(allPosts?.data[0].photo);
                    setCreated_at(allPosts?.data);
                    setDescription(allPosts?.data[0].description);
                    setLikePost(allPosts?.data[0].like);

                    setLoading(false);
                }
            }
            fetchPosts()
            return () => {
                isActive = false;
            }
        }, [])
    )

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
    }, [setDocIds]);


    async function handleLikePost(id) {
        let docId = `${userId}_${id}`;
        try {

            if (docId == docIds) {

                await api.put('/deslike', { post_id: id });

                await api.delete(`/deleteDoc?docId=${docId}`);

                setLikePost(posts.like - 1);

                handleRefreshLikes()

                return;

            }

            const user_id = userId;
            const post_id = id;

            await api.post('/docId', { post_id: post_id, user_id: user_id, docId: docId });

            await api.put('/like', { post_id: id });

            setLikePost(posts.like + 1);


        } catch (error) {
            console.log(error.response.data);
        }

        handleRefreshLikes()

    }


    /* function formatTimePost() {
        const datePost = new Date(dataCreated);

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    } */

    async function handleRefreshLikes() {
        setLoadingRefresh(true);

        const allPosts = await api.get(`/postsUser?name=${title}`);

        setPosts(allPosts.data);
        setLoading(false);

        setLoadingRefresh(false);
    }


    return (
        posts.map((post) => {
            return (
                <>
                    <Container>
                        <Header onPress={() => navigation.navigate("PostsUser", { title: name })}>
                            {post.photo ? (
                                <Avatar source={{ uri: photo }} />
                            ) : (
                                <Avatar source={require('../../assets/avatar.png')} />
                            )}

                            <Name numberOfLines={1}>
                                {post.name}
                            </Name>
                        </Header>

                        <ContentView>
                            <Content>{post.description}</Content>
                        </ContentView>

                        <Actions>
                            <LikeButton
                                onPress={() => handleLikePost(post.id, post.like)}>
                                <Like>
                                    {post.like === 0 ? '' : post.like}
                                </Like>
                                <MaterialCommunityIcons
                                    name={post.like === 0 ? 'heart-plus-outline' : 'cards-heart'}
                                    size={20}
                                    color="#E52246"
                                />
                            </LikeButton>

                            <TimePost>
                                {/* {formatTimePost()} */}
                            </TimePost>
                        </Actions>
                    </Container>
                </>
            )
        })
    )
}

export default PostsUser;

















/* import React, { useLayoutEffect, useState, useCallback, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../../services/api";
import { auth } from '../../contexts/auth';
import PostsList from '../../components/PostsList';
import { Container, ListPosts } from "./styles";


function PostsUser() {

    const route = useRoute();
    const navigation = useNavigation();
    const { user } = useContext(auth);
    const [title, setTitle] = useState(route.params?.title);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRefresh, setLoadingRefresh] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: title === '' ? '' : title
        })
    }, [navigation, title]);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function fetchPosts() {

                const allPosts = await api.get(`/postsUser?name=${title}`);

                if (isActive) {
                    setPosts(allPosts.data);
                    setLoading(false);
                }

            }

            fetchPosts()

            return () => {
                isActive = false;
            }
        }, [])
    )

    async function handleRefreshLikes() {
        setLoadingRefresh(true);

        const allPosts = await api.get(`/postsUser?name=${title}`);

        setPosts(allPosts.data);
        setLoading(false);

        setLoadingRefresh(false);
    }

    return (
        <Container>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={50} color="orange" />
                </View>
            ) : (
                <ListPosts
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    renderItem={({ item }) => <PostsList data={item} userId={user?.id} />}
                    refreshing={loadingRefresh}
                    onRefresh={handleRefreshLikes}
                />
            )}
        </Container>
    )
}

export default PostsUser; */