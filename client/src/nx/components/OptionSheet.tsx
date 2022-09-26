import { Actionsheet, Box } from 'native-base'
import { ReactNode } from 'react'

import PressableX from './PressableX'

const Container = Actionsheet

interface ContentProps {
    children: ReactNode
}

function Content({ children }: ContentProps) {
    return (
        <Actionsheet.Content>
            <Box alignItems="flex-start" px={2} width="100%">
                {children}
            </Box>
        </Actionsheet.Content>
    )
}

interface ItemProps {
    children: JSX.Element
    onPress: () => void
}

function Item({ children, onPress }: ItemProps) {
    return (
        <PressableX
            onPress={onPress}
            px={1}
            py={2}
            rounded="sm"
            variant="secondary.ghost"
            width="100%"
        >
            {children}
        </PressableX>
    )
}

export default {
    Container,
    Content,
    Item
}
