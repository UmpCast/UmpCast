import * as Google from 'expo-auth-session/providers/google'
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential
} from 'firebase/auth'
import { Image, VStack, Text, HStack, Heading } from 'native-base'
import React, { useEffect, useMemo, useState } from 'react'

import AppPressable from '@/components/AppPressable'
import MaterialIcon from '@/components/MaterialIcon'
import { useGetOrCreateUserMutation } from '@/graphql/mutations/GetOrCreateUser/index.generated'
import { expoExtra } from '@/utils/expo'

import { AuthContext } from './AuthContext'
import TabsStackNavigator from './navigation/navigators/TabsStackNavigator'

enum AuthState {
    LOADING,
    SIGNED_IN,
    SIGNED_OUT
}

interface Props {
    resetClient: () => void
}

export default function RootView({ resetClient }: Props) {
    const [authState, setAuthState] = useState(AuthState.LOADING)
    const [, getOrCreateUser] = useGetOrCreateUserMutation()

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        expoExtra.GOOGLE_AUTH_CONFIG
    )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
            unsubscribe()

            if (!user) {
                setAuthState(AuthState.SIGNED_OUT)
                return
            }

            const { data } = await getOrCreateUser({})

            const success = data?.getOrCreateUser.success

            if (success) {
                setAuthState(AuthState.SIGNED_IN)
                return
            }

            await getAuth().signOut()
            setAuthState(AuthState.SIGNED_OUT)
            resetClient()
        })
    }, [])

    useEffect(() => {
        if (response?.type !== 'success') {
            return
        }

        const execute = async () => {
            const auth = getAuth()

            const { id_token: idToken } = response.params
            const credential = GoogleAuthProvider.credential(idToken)

            try {
                await signInWithCredential(auth, credential)
            } catch {
                return
            }

            const { data } = await getOrCreateUser({})

            const success = data?.getOrCreateUser?.success

            if (success) {
                setAuthState(AuthState.SIGNED_IN)
                return
            }

            await getAuth().signOut()
            setAuthState(AuthState.SIGNED_OUT)
            resetClient()
        }

        execute()
    }, [response])

    const authContextValue = useMemo(() => {
        const signOut = async () => {
            await getAuth().signOut()
            setAuthState(AuthState.SIGNED_OUT)
            resetClient()
        }

        return {
            signOut
        }
    }, [getAuth, setAuthState, resetClient])

    const onGoogleSignInPress = () => {
        promptAsync()
    }

    switch (authState) {
        case AuthState.LOADING:
            return null
        case AuthState.SIGNED_OUT:
            return (
                <VStack
                    justifyContent="space-between"
                    height="100%"
                    borderWidth={1}
                    p={6}
                    backgroundColor="secondary.bg"
                >
                    <VStack
                        alignItems="center"
                        justifyContent="center"
                        flexGrow={1}
                        space="md"
                    >
                        <Image
                            alt="App logo"
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/195/195542.png'
                            }}
                            size="100px"
                        />
                        <Heading size="2xl">UmpCast</Heading>
                    </VStack>
                    <AppPressable
                        variant="secondary.lite"
                        size="lg"
                        mb="100px"
                        onPress={onGoogleSignInPress}
                        disabled={!request}
                    >
                        <HStack
                            space="sm"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <MaterialIcon name="google" />
                            <Text fontSize="lg" bold>
                                Sign in with Google
                            </Text>
                        </HStack>
                    </AppPressable>
                </VStack>
            )
        case AuthState.SIGNED_IN:
            return (
                <AuthContext.Provider value={authContextValue}>
                    <TabsStackNavigator />
                </AuthContext.Provider>
            )
    }
}
