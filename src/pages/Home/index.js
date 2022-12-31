import React, { useState, useContext, useEffect } from "react";
import { api } from "../../services/api";
import { auth } from "../../contexts/auth";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather';
import { Container, ButtonPost, ListPost } from './styles';
import Header from "../../components/Header";
import PostsList from "../../components/PostsList";


function Home() {

    const navigation = useNavigation();
    const { user } = useContext(auth);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRefresh, setLoadingRefresh] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);


    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {

        let isActive = true;

        try {
            const { data } = await api.get(`/pagePost?page=${currentPage}&limit=${limit}`);

            if (isActive) {
                setPosts([...posts, ...data?.postsall]);
                setCurrentPage(currentPage + 1);
                setLoading(false);
            }

            return () => {
                isActive = false;
            }

        } catch (error) {
            console.error(error.response.data);
        }
    }

    // Buscar mais posts quando puxar sua lista para cima.
    async function handleRefreshPosts() {
        setLoadingRefresh(true);

        const allPosts = await api.get('/allPosts');

        setPosts([]);

        setPosts(allPosts.data);
        setLoading(false);

        setLoadingRefresh(false);
    }

    // Refresh apos dar o like no post.
    async function handleRefreshLikes() {
        setLoadingRefresh(true);

        const allPosts = await api.get('/allPosts');

        setPosts([]);

        setPosts(allPosts.data);
        setLoading(false);

        setLoadingRefresh(false);
    }


    function renderItem({ item }) {
        return <PostsList
            keyExtractor={(item) => item.id}
            data={item}
            respostas={item?.postresponde}
            userId={user?.id}
            refreshingLike={() => handleRefreshLikes()}
        />
    }

    function LoadingFooter(loadingFooter) {
        if (loadingFooter) {
            return <ActivityIndicator size={'large'} color='orange' />;
        }

        return null;
    }

    return (
        <Container>
            <Header />

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={50} color="orange" />
                </View>
            ) : (
                <ListPost
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    renderItem={renderItem}
                    onEndReached={loadPosts}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={<LoadingFooter loadingFooter={LoadingFooter} />}

                    refreshing={loadingRefresh}
                    onRefresh={handleRefreshPosts}
                />
            )}

            <ButtonPost
                activeOpacity={0.8}
                onPress={() => navigation.navigate("NewPost")}
            >
                <Feather
                    name="edit-2"
                    color="#FFF"
                    size={25}
                />
            </ButtonPost>
        </Container>
    )
}

export default Home;