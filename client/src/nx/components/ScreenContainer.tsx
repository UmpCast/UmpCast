import { Box, IBoxProps } from 'native-base'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

interface Props extends IBoxProps {
    title: string
    headerRight?: JSX.Element
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
                headerRight: () => headerRight
            })
        }
    }, [navigation, title, headerRight])

    return (
        <Box m={4} {...rest}>
            {children}
        </Box>
    )
}
