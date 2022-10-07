import { useNavigation } from '@react-navigation/native'
import { Box, IBoxProps } from 'native-base'
import { ReactNode, useEffect } from 'react'

interface Props extends IBoxProps {
    title: string
    headerRight?: ReactNode
}

export default function ScreenContainer({ title, headerRight, children, ...rest }: Props) {
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
        <Box p={4} {...rest}>
            {children}
        </Box>
    )
}
