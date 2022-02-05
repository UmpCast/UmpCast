import PressableItem from '@/components/Pressable/Item'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Image, Text } from 'native-base'

export interface OrganizationListItemProps {
    title: string
    pictureUrl?: string
}

export default function OrganizationListItem({
    title,
    pictureUrl
}: OrganizationListItemProps) {
    return (
        <PressableItem>
            <HStack space={3} justifyContent="left" alignItems="center">
                {pictureUrl ? (
                    <Image
                        src={pictureUrl}
                        size="23px"
                        borderRadius="25px"
                        my="1px"
                        mr="1px"
                    />
                ) : (
                    <Icon
                        as={FontAwesome}
                        name="question-circle-o"
                        color="indigo.500"
                        size="25px"
                    />
                )}
                <Text fontSize="xs" color="blueGray.600" fontWeight="medium">
                    {title}
                </Text>
            </HStack>
        </PressableItem>
    )
}
