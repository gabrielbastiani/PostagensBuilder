import React, { useState, createContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../services/api';


export const auth = createContext({});

export function AuthProvider({ children }){
    const [ user, setUser ] = useState({
        id: '',
        name: '',
        email: '',
        token: '',
    })

    const [ loadingAuth, setLoadingAuth ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    const isAuthenticated = !!user.name

    useEffect(() => {
        async function getUser(){
            const userInfo = await AsyncStorage.getItem('@postagensBuilder')
            let hasUser = JSON.parse(userInfo || '{}')

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token,
                })
            }

            setLoading(false)
        }

        getUser()
    }, [])

    async function signIn({ email, password }){
        setLoadingAuth(true)

        try{
            const response = await api.post('/session', {
                email,
                password,
            })

            const { id, name, token } = response.data

            const data = {
                ...response.data

            }

            await AsyncStorage.setItem('@postagensBuilder', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token,
            })

            setLoadingAuth(false)
        }catch(err){
            console.log('erro ao acessar', err)
            alert("EMAIL OU SENHA ERRADA!!!")
            setLoadingAuth(false)
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: '',
                })
            })
    }

    return(
        <auth.Provider 
            value={{ 
                user, 
                isAuthenticated, 
                signIn,
                signOut,
                loading, 
                loadingAuth,
                setUser,
            }}
        >
            {children}
        </auth.Provider>
    )
}