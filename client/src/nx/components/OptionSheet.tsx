import { Actionsheet, Box, IActionsheetProps } from 'native-base'

import PressableX from './PressableX'

function Container(props: IActionsheetProps) {
    return <Actionsheet {...props} />
}

function Content({ children, ...rest }: IActionsheetProps) {
    return (
        <Actionsheet {...rest}>
            <Actionsheet.Content flex={1}>
                <Box flex={1} width="100%">
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
        <PressableX onPress={onPress} rounded="sm" size="md" variant="secondary.ghost">
            {children}
        </PressableX>
    )
}

export default {
    Container,
    Content,
    Item
}
