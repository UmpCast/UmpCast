import React from 'react'

import { Button, Icon, HStack, Text } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

export default function FacebookSignInButton({
    title,
    disabled,
    onPress
}: {
    title: string
    disabled: boolean
    onPress: () => void
}) {
    return (
        <Button
            disabled={disabled}
            onPress={onPress}
            variant="outline"
            colorScheme="blueGray"
            borderWidth={2}
            mt={10}
        >
            <HStack alignItems="center" space={2}>
                <Icon as={AntDesign} name="google" size={5} />
                <Text fontSize="lg" bold>
                    {title}
                </Text>
            </HStack>
        </Button>
    )
}
