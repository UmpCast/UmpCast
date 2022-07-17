import { Pressable } from 'native-base'
import { IPressableProps } from 'native-base'

interface Props extends IPressableProps {}

export default function ListItem({ ...rest }: Props) {
    return (
        <Pressable
            _hover={{
                backgroundColor: 'blueGray.100'
            }}
            _pressed={{
                backgroundColor: 'blueGray.200'
            }}
            borderRadius="sm"
            p={2}
            {...rest}
        />
    )
}
