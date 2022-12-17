import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Input, Button, ButtonText } from './styles';
import { api } from '../../services/api';
import { auth } from '../../contexts/auth';


function NewPost() {

    const navigation = useNavigation();

    const { user } = useContext(auth);

    const name = user.name;
    const [photo, setPhoto] = useState(avatarUrl);
    const [description, setDescription] = useState("");
    const [like, setLike] = useState(0);
    const [imgPost, setImgPost] = useState('');


    useEffect(() => {
        async function loadUserDetails() {
            const userDetails = await api.get('/detailUser');
            setPhoto(userDetails.data.photo);
        }
        loadUserDetails();
    }, [])

    useLayoutEffect(() => {
        const options = navigation.setOptions({
            headerRight: () => (
                <Button onPress={handlePost}>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })
    }, [navigation, description]);

    let avatarUrl = null;

    try {
        let response = photo;
        avatarUrl = response;
    } catch (error) {
        avatarUrl = null;
    }


    let imgPostUrl = null;

    try {
        let responseImgPost = imgPost;
        imgPostUrl = responseImgPost;
    } catch (error) {
        imgPostUrl = null;
    }

    async function handlePost(event) {
        event.preventDefault();

        try {
            if (description === '') {
                alert('Ops!!! Escreva alguma coisa... não pode deixar em branco!');
                return;
            }

            await api.post('/post', { name: name, description: description, like: like, imgPost: imgPost });

            alert('Post realizado no Feed!');

        } catch (error) {
            console.log(error);
            alert('Erro ao postar!');
        }

        setDescription('');
        navigation.goBack();

    }


    return (
        <Container>
            <Input
                placeholder="O que está acontecendo?"
                value={description}
                onChangeText={setDescription}
                autoCorrect={false}
                multiline={true}
                placeholderTextColor="orange"
                maxLength={350}
            />
        </Container>
    )
}

export default NewPost;