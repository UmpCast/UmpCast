import React from 'react'

import { Center, Heading, VStack } from 'native-base'

import Logo from 'assets/logo'


export default function AppSplashScreen({
    iconSize = 50
}: {
    iconSize?: number
}) {
    return (
        <Center flex={1}>
            <VStack space={3} alignItems="center">
                <Logo width={iconSize} height={iconSize} />
                <Heading>UmpCast</Heading>
            </VStack>
        </Center>
    )
}
