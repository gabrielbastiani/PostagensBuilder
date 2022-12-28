import React from "react";
import { Container, Name, Avatar } from "./styles";
import { useNavigation } from "@react-navigation/native";

function SearchList({ data }){

    const navigation = useNavigation();

    return(
        <Container onPress={ () => navigation.navigate("PostsUser", { title: data.name })}>
            {data?.photo ? (
                    <Avatar source={{ uri: 'http://192.168.0.147:3333/files/' + data?.photo }} />
                ) : (
                    <Avatar source={require('../../assets/avatar.png')} />
                )} 
            <Name>
                {data?.name}
                {'\n'}
                {data?.email}
            </Name>
            
        </Container>
    )
}

export default SearchList;