import React, { useState, useContext, useCallback } from "react";
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
    const [lastItem, setLastItem] = useState('');
    const [emptyList, setEmptyList] = useState(false);


    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function fetchPosts() {
                const allPosts = await api.get('/allPosts');

                if (isActive) {
                    setPosts([])
                }

                setEmptyList(!!allPosts.data === null)
                setPosts(allPosts.data);
                setLastItem(allPosts.data[1]);
                setLoading(false);
            }

            fetchPosts();

            return () => {
                isActive = false;
            }

        }, [])
    )


    // Buscar mais posts quando puxar sua lista para cima.
    async function handleRefreshPosts() {
        setLoadingRefresh(true);

        const allPosts = await api.get('/allPosts');
        
        setPosts([])

        setPosts(allPosts.data);
        setLastItem(allPosts.data[1]);
        setLoading(false);

        setLoadingRefresh(false);
    }

    async function handleRefreshLikes() {
        setLoadingRefresh(true);

        const allPosts = await api.get('/allPosts');
        
        setPosts([])

        setPosts(allPosts.data);
        setLoading(false);

        setLoadingRefresh(false);
    }

    // Buscar mais posts ao chegar no final da lista
    /* async function getListPosts(){
        if(emptyList){
            // Se buscou toda sua lista tiramos o loading
            setLoading(false);
            return null;
        }
        
        if(loading) return;
    } */

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
                    renderItem={({ item }) => (
                        <PostsList
                            data={item}
                            userId={user?.id}
                            refreshingLike={ () => handleRefreshLikes()}
                        />
                    )}

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