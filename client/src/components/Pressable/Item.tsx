import { Pressable, IPressableProps } from 'native-base'

export default function PressableItem(props: IPressableProps) {
    return (
        <Pressable
            bgColor="blueGray.200"
            _hover={{ bgColor: 'blueGray.300' }}
            py={2}
            px={3}
            borderRadius={5}
            {...props}
        />
    )
}
