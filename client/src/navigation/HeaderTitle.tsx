import { ITextProps, Text } from 'native-base'

export interface NavHeaderTitleProps extends ITextProps {}

export default function NavHeaderTitle(props: NavHeaderTitleProps) {
    return (
        <Text
            color="blueGray.700"
            fontSize="xl"
            fontWeight="medium"
            {...props}
        />
    )
}
