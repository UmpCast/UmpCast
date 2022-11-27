import { Actionsheet, Box, IActionsheetProps } from 'native-base'

import ThemedPressable from './ThemedPressable'

function Container(props: IActionsheetProps) {
    return <Actionsheet {...props} />
}

function Content({ children, ...rest }: IActionsheetProps) {
    return (
        <Actionsheet {...rest}>
            <Actionsheet.Content backgroundColor="secondary.lite">
                <Box width="100%">
                    {children}
                </Box>
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
    Container,
    Content,
    Item
}
