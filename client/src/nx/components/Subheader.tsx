import { ITextProps } from 'native-base'
import { Text } from 'native-base'

interface Props extends ITextProps {}

export default function Subheader(props: Props) {
    return <Text bold {...props} />
}
