import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { api } from '../../services/api';
import { Container, AreaInput, Input, List } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import SearchList from "../../components/SearchList";


function Search() {

    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchusers() {
            if (input === '' || input === undefined) {
                setUsers([]);
                return;
            }
            const allUsers = await api.get(`/postsUser?name=${input}`);

            const usersAll = allUsers?.data;

                const listUsers = [];

                const filterName = usersAll.filter((filt) => filt.name.toLowerCase().includes());
                filterName.forEach(filt => { 
                    console.log(filt.name);
                });

            setUsers(listUsers);

        }
        
        fetchusers();

    }, [input]);


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
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
            </AreaInput>

            <List
                data={users}
                renderItem={ ({item}) => <SearchList data={item} /> }
            />

        </Container>
    )
}

export default Search;