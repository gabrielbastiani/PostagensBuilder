import React, { useState, useContext, useCallback, useEffect } from "react";
import { api } from "../../services/api";
import { auth } from "../../contexts/auth";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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

    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(7);


    async function loadPosts() {

        if(!loading) return;
        setLoading(true);

        try {
            const { data } = await api.get(`/pagePost?page=${currentPage}&limit=${limit}`);

            /* setTotal(data?.total);
            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
                arrayPages.push(i);
            } */

            setPosts([...posts, ...data?.postsall]);
            setCurrentPage(currentPage + 1);

            setLoading(false);

        } catch (error) {
            console.error(error.response.data);
        }
    }

    useEffect(() => {
        loadPosts();
    }, []);


    // Buscar mais posts quando puxar sua lista para cima.
    async function handleRefreshPosts() {
        setLoadingRefresh(true);

        const allPosts = await api.get('/allPosts');

        setPosts([]);

        setPosts(allPosts.data);
        setLoading(false);

        setLoadingRefresh(false);
    }

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
                    ListFooterComponent={<LoadingFooter loadingFooter={loading} />}

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