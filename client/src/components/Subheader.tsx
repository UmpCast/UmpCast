import { ITextProps, Text } from 'native-base'

type Props = ITextProps

export default function Subheader(props: Props) {
    return <Text bold {...props} />
}
