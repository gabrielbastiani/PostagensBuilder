import React, {useContext} from "react";
import { View, Text, Button } from "react-native";
import {Auth} from '../../contexts/Auth';

function Profile(){

    const {signOut} = useContext(Auth);

    async function handleSignOut(){
        await signOut();
    }

    return(
        <View>
            <Text>Tela Profile</Text>
            <Button
                title="Sair"
                onPress={handleSignOut}
            />
        </View>
    )
}

export default Profile;