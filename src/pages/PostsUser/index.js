import React, { useLayoutEffect, useState, useCallback, useContext } from "react";
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

export default PostsUser;