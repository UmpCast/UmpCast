import { Actionsheet, Box, IActionsheetProps } from 'native-base'
import { ReactNode } from 'react'

import ThemedPressable from './ThemedPressable'

function Container({children}: {children: ReactNode} ) {
    return <Box p={3}>{children}</Box>
}

function Content({ children, ...rest }: IActionsheetProps) {
    return (
        <Actionsheet {...rest}>
            <Actionsheet.Content backgroundColor="secondary.lite">
                <Box width="100%">{children}</Box>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

interface ItemProps {
    children: JSX.Element
    onPress: () => void
}

function Item({ children, onPress }: ItemProps) {
    return (
        <ThemedPressable
            onPress={onPress}
            px={3}
            py={2}
            rounded="sm"
            variant="secondary.ghost"
        >
            {children}
        </ThemedPressable>
    )
}

export default {
    Content,
    Container,
    Item
}
