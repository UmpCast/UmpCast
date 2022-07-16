import { Box, Button, VStack } from 'native-base'

import OrgEditForm from '@/features/Org/core/Edit/Form'
import useOrgEditForm from '@/features/Org/core/Edit/useForm'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import { useOrganizationSettingsProfileScreenQuery } from '@/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type ScreenProps =
    RootStackScreenProps<RootStackRoute.OrganizationSettingsProfile>

export default function OrganizationSettingsProfileScreen({
    route
}: ScreenProps) {
    const {
        params: { orgId }
    } = route

    const [{ data }] = useOrganizationSettingsProfileScreenQuery({
        variables: {
            id: orgId
        }
    })

    const { control, onSubmit } = useOrgEditForm({
        id: orgId,
        org: data?.organization
    })

    if (!data?.organization) return null

    return (
        <Box p={4}>
            <VStack space={6}>
                <OrgEditForm
                    control={control}
                    logo={<OrgProfileLogo org={data?.organization} />}
                />
                <Button colorScheme="indigo" onPress={onSubmit}>
                    Save Changes
                </Button>
            </VStack>
        </Box>
    )
}
