import { Feather } from '@expo/vector-icons'
import { Box, IBoxProps, Icon } from 'native-base'

export default function UserAvatarBlank(props: IBoxProps) {
    return (
        <Box borderWidth="1" alignSelf="flex-start" {...props}>
            <Icon as={Feather} name="user" />
        </Box>
    )
}
