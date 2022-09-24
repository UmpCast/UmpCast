import { Actionsheet, Box } from 'native-base'
import { ReactNode } from 'react'
import PressableX from './PressableX'

interface ContentProps {
    children: ReactNode
}

function Content({ children }: ContentProps) {
    return (
        <Actionsheet.Content>
            <Box alignItems="flex-start" width="100%" px={2}>
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
            variant="secondary.ghost"
            rounded="sm"
            py={2}
            px={1}
            width="100%"
            onPress={onPress}
        >
            {children}
        </PressableX>
    )
}

export default {
    Content,
    Item
}
