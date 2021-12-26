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
        >
            <HStack alignItems="center" space={2}>
                <Icon
                    as={AntDesign}
                    name="facebook-square"
                    size={5}
                    color="blue.500"
                />
                <Text fontSize="lg" bold color="blue.500">
                    {title}
                </Text>
            </HStack>
        </Button>
    )
}
