import { Pressable, IPressableProps } from 'native-base'

export interface PressableItemProps extends IPressableProps {}

export default function PressableItem(props: PressableItemProps) {
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
