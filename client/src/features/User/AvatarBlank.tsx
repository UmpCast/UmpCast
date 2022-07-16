import { Feather } from '@expo/vector-icons'
import { Box, IBoxProps, Icon } from 'native-base'

export default function UserAvatarBlank(props: IBoxProps) {
    return (
        <Box alignSelf="flex-start" borderWidth="1" {...props}>
            <Icon as={Feather} name="user" />
        </Box>
    )
}
