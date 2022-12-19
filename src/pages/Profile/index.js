import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, Modal, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { auth } from '../../contexts/auth';
import {
    ButtonText,
    Button,
    Container,
    Email,
    Name,
    UploadButton,
    UploadText,
    Avatar,
    ModalContainer,
    ButtonBack,
    Input
} from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import { api } from "../../services/api";


function Profile() {

    const { signOut, user } = useContext(auth);
    const [name, setName] = useState(user?.name);
    const [photo, setPhoto] = useState(null);
    const [open, setOpen] = useState(false);

    let user_id = String(user.id);

    console.log(photo)

    useEffect(() => {
        async function loadAvatar() {
            try {
                const response = await api.get(`/userPhoto?user_id=${user_id}`);
            
                setPhoto(response?.data.photo);

            } catch (err) {
                console.log("NAO ENCONTRAMOS NENHUMA FOTO")
            }
        }

        loadAvatar();

        return () => loadAvatar();

    }, []);

    async function handleSignOut() {
        await signOut();
    }

    async function updateProfile() {
        if (name === '') {
            return;
        }
        await api.put(`/nameUpdate?user_id=${user_id}`, { name });
        handleSignOut();
    }

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

                uploadImageUser(response);

                setPhoto(response.assets[0].uri);

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

    const uploadImageUser = async (response) => {

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
                })

            await api.put(`/photoUser?user_id=${user_id}`, data, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            })

        } catch (err) {
            console.log(err.response.data);
        }

    }



    return (
        <Container>

            {photo ? (
                <UploadButton onPress={() => uploadFile()}>
                    <UploadText>+</UploadText>
                    <Avatar
                        source={{ uri: 'http://localhost:3333/files/' + photo }}
                    />
                </UploadButton>
            ) : (
                <UploadButton onPress={() => uploadFile()}>
                    <UploadText>+</UploadText>
                </UploadButton>
            )}

            <Name>{user?.name}</Name>
            <Email>{user?.email}</Email>

            <Button bg="orange" onPress={() => setOpen(true)} >
                <ButtonText color="#FFF">Atualizar Perfil</ButtonText>
            </Button>

            <Button bg="red" onPress={handleSignOut}>
                <ButtonText color="white">Sair</ButtonText>
            </Button>

            <Modal visible={open} animationType="slide" transparent={true}>
                <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
                    <ButtonBack onPress={() => setOpen(false)}>
                        <Feather
                            name="arrow-left"
                            size={22}
                            color="#121212"
                        />
                        <ButtonText color="#121212">Voltar</ButtonText>
                    </ButtonBack>

                    <Input
                        placeholder={user?.nome}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <Button bg="red" onPress={updateProfile}>
                        <ButtonText color="#FFF">Salvar</ButtonText>
                    </Button>


                </ModalContainer>
            </Modal>

        </Container>
    )
}

export default Profile;