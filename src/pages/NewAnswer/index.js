import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Input, Button, ButtonText, UploadButton, UploadText, Avatar } from './styles';
import { api } from '../../services/api';
import { auth } from '../../contexts/auth';
import { launchImageLibrary } from "react-native-image-picker";


function NewAnswer() {

    const navigation = useNavigation();

    const { user } = useContext(auth);

    const route = useRoute();

    let name = user.name;
  
    const [postId, setPostId] = useState(route.params?.postId);
    const [answer, setAnswer] = useState("");
    const [imgAnswer, setImgAnswer] = useState(null);
    const [post_id, setPost_id] = useState('');

    console.log(name)
    console.log(answer)
    console.log(imgAnswer)
    console.log(post_id)

    /* useEffect(() => {
        async function loadUserDetails() {
            const userDetails = await api.get('/detailUser');
            setPhoto(userDetails.data.photo);
        }
        loadUserDetails();
    }, []) */

    useLayoutEffect(() => {
        const options = navigation.setOptions({
            headerRight: () => (
                <Button onPress={handleAnswer}>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })
    }, [navigation, answer, imgAnswer]);


    const uploadFile = () => {
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

                console.log(response.assets[0].uri)
                
                setImgAnswer(response.assets[0].uri);

                handleAnswer(response)

            }
        })
    }

    const getTypefile = (response) => {
        // extrair e retornar o tipo da foto.
        return response.assets[0].type;
    }

    const getFilename = (response) => {
        // extrair e retornar o nome da foto.
        return response.assets[0].fileName;
    }

    const getFileLocalPath = (response) => {
        // extrair e retornar a url da foto.
        return response.assets[0].uri;
    }


    const handleAnswer = async (response) => {

        const fileSource = getFileLocalPath(response);
        const nameFile = getFilename(response);
        const typeFile = getTypefile(response);

        try {

            const data = new FormData();

            data.append("file",
                {
                    name: nameFile,
                    type: typeFile,
                    uri: fileSource
                });
            data.append("name", name);
            data.append("answer", answer);
            data.append("post_id", postId);

            await api.post('/answer', data), {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            }

            alert('Resposta realizada!');

        } catch (error) {
            console.log(error);
            alert('Erro ao postar!');
        }

        setDescription('');
        navigation.goBack();

    }

    /*let avatarUrl = null;

     tr {
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
    } */




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

            {imgAnswer ? (
            <UploadButton onPress={() => uploadFile()}>
                <UploadText>+</UploadText>
                <Avatar
                    source={{ uri: 'http://localhost:3333/files/' + imgAnswer }}
                />
            </UploadButton>
            ) : (
                <UploadButton onPress={() => uploadFile()}>
                    <UploadText>+</UploadText>
                </UploadButton>
            )}
        </Container>
    )
}

export default NewAnswer;