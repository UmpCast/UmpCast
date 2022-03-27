import { useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import { useOrganizationSettingsProfileScreenQuery } from '@/generated'

import { RootStackScreenProps } from '@/navigation/screenProps'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import OrgEditForm from '@/features/Org/core/Edit/Form'
import useOrgEditForm from '@/features/Org/core/Edit/useForm'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'

type ScreenProps =
    RootStackScreenProps<RootStackRoute.OrganizationSettingsProfile>

export default function OrganizationSettingsProfileScreen() {
    const {
        params: { orgId }
    } = useRoute<ScreenProps['route']>()

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
