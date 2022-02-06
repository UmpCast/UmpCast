import { OrganizationInfoActionsheetFragment } from '@/generated'
import {
    Actionsheet,
    Divider,
    Heading,
    Image,
    Text,
    useDisclose,
    VStack
} from 'native-base'

interface OrganizationInfoActionsheetProps {
    permit: OrganizationInfoActionsheetFragment
}

export default function OrganizationInfoActionsheet({
    permit
}: OrganizationInfoActionsheetProps) {
    const {
        organization: { profilePicture, title, description },
        permissionLevel
    } = permit
    const props = useDisclose(true)
    return (
        <Actionsheet {...props} hideDragIndicator>
            <Actionsheet.Content p={4} alignItems="stretch">
                <VStack space={3}>
                    {profilePicture && (
                        <Image
                            src={profilePicture}
                            alt="organizaton-profile-picture"
                            size={45}
                            borderRadius={5}
                        />
                    )}
                    <VStack space={1}>
                        <Heading fontSize="md" color="blueGray.700">
                            {title}
                        </Heading>
                        <Text fontSize="xs" color="blueGray.600">
                            {description}
                        </Text>
                    </VStack>
                    <Divider color="blueGray.200" />
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
