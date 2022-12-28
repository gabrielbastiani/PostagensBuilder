import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { api } from '../../services/api';
import { Container, AreaInput, Input, List } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import SearchList from "../../components/SearchList";


function Search() {

    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results);

    useEffect(() => {
        async function allUsers() {
            const { data } = await api.get(`/allUsers`);
            setResults(data);
        }
        allUsers();
    }, []);

    useEffect(() => {
        if (searchText === '') {
            setList([]);
        } else {
            setList(
                results.filter(
                    (item) =>
                        item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
            );
        }
    }, [searchText]);


    return (
        <Container>
            <AreaInput>
                <Feather
                    name="search"
                    size={20}
                    color="orange"
                />
                <Input
                    placeholder="Procurando alguem?"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                />
            </AreaInput>

            <List
                data={list}
                renderItem={({ item }) => <SearchList data={item} />}
                keyExtractor={(item) => item.id}
            />

        </Container>
    )
}

export default Search;