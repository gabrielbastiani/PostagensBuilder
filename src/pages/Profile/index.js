import React, {useContext, useState} from "react";
import { View, Text, Modal, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import {Auth} from '../../contexts/Auth';
import Header from '../../components/Header';
import { ButtonText, Button, Container, Email, Name, UploadButton, UploadText, Avatar, ModalContainer, ButtonBack, Input } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import { api } from "../../services/api";


function Profile(){
    
    const {signOut, user } = useContext(Auth);
    const [name, setName] = useState(user?.name);
    const [url, setUrl] = useState(null);
    const [open, setOpen] = useState(false);

    async function handleSignOut(){
        await signOut();
    }

    async function updateProfile(){
        if(name === ''){
            return;
        }

        await api.put(`/nameUpdate?user_id=${user.id}`, { name });
    
    }

    const uploadFile = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        };

        launchImageLibrary(options, response => {
            if(response.didCancel){
                console.log("Cancelou!!");
            } else if(response.error){
                console.log("Ops parece que deu algum erro")
            }else{
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

    const uploadFileApi = async (response) => {
        const fileSource = getFileLocalPath(response);
        try {
            const data = new FormData()

            data.append('user_id', user.id);
            data.append('file', fileSource);
            
            await api.put('/photoUser', data);

        } catch (err) {
            console.log(err);
        }
    }


    return(
        <Container>
            <Header />

            { url ? (
                <UploadButton onPress={ () => uploadFile() }>
                    <UploadText>+</UploadText>
                </UploadButton>
            ) : (
                <UploadButton onPress={ () => uploadFile() }>
                    <UploadText>+</UploadText>
                    <Avatar
                        source={{ uri: url }}
                    />
                </UploadButton>
            )}

            <Name>{user?.name}</Name>
            <Email>{user?.email}</Email>

            <Button bg="orange" onPress={ () => setOpen(true) }>
                <ButtonText color="#FFF">Atualizar Perfil</ButtonText>
            </Button>

            <Button bg="red" onPress={ handleSignOut }>
                <ButtonText color="#FFF">Sair</ButtonText>
            </Button>

            <Modal visible={open} animationType="slide" transparent={true} >
                <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
                    <ButtonBack onPress={ () => setOpen(false)}>
                        <Feather
                            name="arrow-left"
                            size={22}
                            color="#121212"
                        />
                        <ButtonText color="#121212">Voltar</ButtonText>
                    </ButtonBack>

                    <Input
                        placeholder={user?.name}
                        value={name}
                        onChangeText={ (text) => setName(text) }
                    />

                    <Button bg="red" onPress={ updateProfile }>
                        <ButtonText color="#FFF">Atualizar</ButtonText>
                    </Button>

                </ModalContainer>
            </Modal>

        </Container>
    )
}

export default Profile;