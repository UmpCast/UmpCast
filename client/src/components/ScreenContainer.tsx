import { useNavigation } from '@react-navigation/native'
import { Box, IBoxProps } from 'native-base'
import React, { ReactNode, useEffect } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

interface Props extends IBoxProps {
    title?: string
    headerRight?: ReactNode
}

export default function ScreenContainer({
    title,
    headerRight,
    children,
    ...rest
}: Props) {
    const navigation = useNavigation()

    useEffect(() => {
        const { setOptions } = navigation

        if (title) {
            setOptions({
                title
            })
        }

        if (headerRight) {
            setOptions({
                headerRight: () => <Box mr={4}>{headerRight}</Box>
            })
        }
    }, [navigation, title, headerRight])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Box
                p={4}
                {...rest}
                borderTopWidth={'1px'}
                borderColor="secondary.lite"
                h="100%"
            >
                {children}
            </Box>
        </TouchableWithoutFeedback>
    )
}
