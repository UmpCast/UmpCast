import { IPressableProps, Pressable } from 'native-base'

export interface SeasonParticipantInfoItemPressableProps
    extends IPressableProps {}

export default function SeasonParticipantInfoItemPressable(
    props: SeasonParticipantInfoItemPressableProps
) {
    return (
        <Pressable
            _hover={{
                backgroundColor: 'blueGray.100'
            }}
            _pressed={{
                backgroundColor: 'blueGray.200'
            }}
            borderRadius={5}
            px={4}
            py={2}
            {...props}
        />
    )
}
