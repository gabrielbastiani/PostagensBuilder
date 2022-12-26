import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Input, Button, ButtonText, UploadButton, UploadText, Avatar, TextInfo } from './styles';
import { api } from '../../services/api';
import { auth } from '../../contexts/auth';
import { launchImageLibrary } from "react-native-image-picker";
import mime from "mime";


function NewAnswer() {

    const navigation = useNavigation();

    const { user } = useContext(auth);

    const route = useRoute();

    let name = user.name;

    const [postId, setPostId] = useState(route.params?.postId);
    const [answer, setAnswer] = useState("");
    const [imgAnswer, setImgAnswer] = useState(null);


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

                setImgAnswer(response.assets[0].uri);

                handleAnswer(response);

            }
        })
    }


    const handleAnswer = async (response) => {

        const getFileLocalPath = (response) => {
            // extrair e retornar a url da foto.
            return response.assets[0].uri;
        }

        const fileSource = getFileLocalPath(response);

        const newImageUri = "file:///" + fileSource.split("file:/").join("");

        try {

            const data = new FormData();

            if (answer === '') {
                alert('Ops!!! Escreva alguma legenda para sua imagem!');
                return;
            }

            data.append('file', {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });
            data.append("name", name);
            data.append("answer", answer);
            data.append("post_id", postId);

            await api.post('/answer', data, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            })

            alert('Resposta realizada!');

        } catch (error) {
            console.log(error.response.data);
            alert('Erro ao postar!');
        }

        setAnswer('');
        navigation.goBack();

    }

    

    async function handlePostText(event) {
        event.preventDefault();

        try {
            if (answer === '') {
                alert('Ops!!! Escreva alguma coisa... não pode deixar em branco!');
                return;
            }

            await api.post('/postAnswer', { name: name, answer: answer, post_id: postId });

            alert('Resposta realizada!');

        } catch (error) {
            console.log(error);
            alert('Erro ao postar a resposta!');
        }

        setAnswer('');
        navigation.goBack();

    }



    return (
        <Container>
            <Input
                placeholder="Responda aqui"
                value={answer}
                onChangeText={setAnswer}
                autoCorrect={false}
                multiline={true}
                placeholderTextColor="orange"
                maxLength={350}
            />

            <Button onPress={handlePostText}>
                <ButtonText>Compartilhar apenas o texto</ButtonText>
            </Button>

            <TextInfo>Insira imagem abaixo se desejar</TextInfo>

            {imgAnswer ? (
                <UploadButton onPress={uploadFile}>
                    <UploadText>+</UploadText>
                    <Avatar
                        source={{ uri: imgAnswer }}
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

export default NewAnswer;