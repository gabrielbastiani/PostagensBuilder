import React, { useContext, useState, useEffect } from "react";
import { View, Text, Modal, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { auth } from '../../contexts/auth';
import Header from '../../components/Header';
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
    const [url, setUrl] = useState(null);
    const [open, setOpen] = useState(false);

    let user_id = user.id;


    useEffect(()=>{
        async function loadAvatar(){
          try{
            const response = await api.get(`/userPhoto?user_id=${user_id}`);
            setUrl(response.data.photo);
          }catch(err){
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
    }

    const uploadFile = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log("Cancelou!!");
            } else if (response.error) {
                console.log("Ops parece que deu algum erro")
            } else {
                uploadFileApi(response)

                console.log("URI DA FOTO", response.assets[0].uri)
                setUrl(response.assets[0].uri)
            }
        })
    }

    const getFileLocalPath = (response) => {
        // extrair e retornar a url da foto.
        return response.assets[0].uri;
    }


    const uploadFileApi = async (event, response) => {
        event.preventDefault();
        /* const fileSource = getFileLocalPath(response); */
        try {
            const data = new FormData()

            data.append('user_id', user_id);
            data.append('file', url);

            await api.put('/photoUser', data);

        } catch (err) {
            console.log(err.response.data);
        }
    }


    return (
        <Container>
            <Header />

            {url ? (
                <UploadButton onPress={() => uploadFile()}>
                    <UploadText>+</UploadText>
                    <Avatar
                        source={{ uri: url }}
                    />
                </UploadButton>
            ) : (
                <UploadButton onPress={ () => uploadFile()}>
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