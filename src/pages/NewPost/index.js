import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Input, Button, ButtonText, UploadButton, UploadText, Avatar } from './styles';
import { api } from '../../services/api';
import { auth } from '../../contexts/auth';
import { launchImageLibrary } from "react-native-image-picker";


function NewPost() {

    const navigation = useNavigation();

    const { user } = useContext(auth);

    const name = user.name;
    const [description, setDescription] = useState("");
    const [like, setLike] = useState(0);
    const [imgPost, setImgPost] = useState(null);

    console.log(name)
    console.log(description)
    console.log(imgPost)

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
                <Button onPress={() => handlePost()}>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })
    }, [navigation, description]);


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
                handlePost(response)
                setImgPost(response.assets[0].uri);

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

    const handlePost = async (response) => {

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
            data.append("description", description);

            await api.post('/post', data), {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            }

            alert('Post realizado no Feed!');

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
                placeholder="O que está acontecendo?"
                value={description}
                onChangeText={setDescription}
                autoCorrect={false}
                multiline={true}
                placeholderTextColor="orange"
                maxLength={350}
            />

            {/* {imgPost ? ( */}
            <UploadButton onPress={() => uploadFile()}>
                <UploadText>+</UploadText>
                <Avatar
                    source={{ uri: 'http://localhost:3333/files/' + imgPost }}
                />
            </UploadButton>
            {/*  ) : (
                <UploadButton onPress={() => uploadFile()}>
                    <UploadText>+</UploadText>
                </UploadButton>
            )} */}
        </Container>
    )
}

export default NewPost;























/* import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
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

export default NewPost; */