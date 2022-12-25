import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Input, Button, ButtonText, UploadButton, UploadText, Avatar, Text } from './styles';
import { api } from '../../services/api';
import { auth } from '../../contexts/auth';
import { launchImageLibrary } from "react-native-image-picker";
import mime from "mime";


function NewPost() {

    const navigation = useNavigation();

    const { user } = useContext(auth);

    let name = user.name;
    const [description, setDescription] = useState("");
    const [imgPost, setImgPost] = useState(null);


    function uploadFile() {
        const options = {
            noData: true,
            mediaType: 'file'
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log("Cancelou!!");
            } else if (response.error) {
                console.log("Ops parece que deu algum erro")
            } else {

                setImgPost(response.assets[0].uri);

                handlePostImage(response)

            }
        })
    }


        const handlePostImage = async (response) => {

        const getFileLocalPath = (response) => {
            // extrair e retornar a url da foto.
            return response.assets[0].uri;
        }

        const fileSource = getFileLocalPath(response);

        const newImageUri = "file:///" + fileSource.split("file:/").join("");

        try {

            const data = new FormData();

            if (description === '') {
                alert('Ops!!! Escreva alguma legenda para sua imagem!');
                return;
            }

            data.append('file', {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });
            data.append("name", name);
            data.append("description", description);

            await api.post('/post', data, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            })

            alert('Post realizado no Feed!');

        } catch (error) {
            console.log(error);
            alert('Erro ao postar!');
        }

        setDescription('');
        navigation.goBack();
    }

    async function handlePostText(event) {
        event.preventDefault();

        try {
            if (description === '') {
                alert('Ops!!! Escreva alguma coisa... não pode deixar em branco!');
                return;
            }

            await api.post('/postText', { name: name, description: description });

            alert('Post realizado no Feed!');

        } catch (error) {
            console.log(error);
            alert('Erro ao postar o texto!');
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

            <Button onPress={handlePostText}>
                <ButtonText>Compartilhar apenas o texto</ButtonText>
            </Button>

            <Text>Insira imagem abaixo se desejar</Text>

            {imgPost ? (
                <UploadButton onPress={uploadFile}>
                    <UploadText>+</UploadText>
                    <Avatar
                        source={{ uri: imgPost }}
                    />
                </UploadButton>
            ) : (
                <UploadButton onPress={uploadFile}>
                    <UploadText>+</UploadText>
                </UploadButton>
            )}
        </Container>
    )
}

export default NewPost;