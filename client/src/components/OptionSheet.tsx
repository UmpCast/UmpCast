import { Actionsheet, Box, IActionsheetProps } from 'native-base'

import AppPressable from './AppPressable'

function Container(props: IActionsheetProps) {
    return <Actionsheet {...props} />
}

function Content({ children, ...rest }: IActionsheetProps) {
    return (
        <Actionsheet {...rest}>
            <Actionsheet.Content>
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
        <AppPressable
            onPress={onPress}
            rounded="sm"
            size="md"
            variant="secondary.ghost"
        >
            {children}
        </AppPressable>
    )
}

export default {
    Container,
    Content,
    Item
}
