import React from "react";
import { Container, Name } from "./styles";
import { useNavigation } from "@react-navigation/native";

function SearchList({ data }){

    const navigation = useNavigation();

    return(
        <Container onPress={ () => navigation.navigate("PostsUser", { title: data.name })}>
            <Name>{data.name}</Name>
        </Container>
    )
}

export default SearchList;