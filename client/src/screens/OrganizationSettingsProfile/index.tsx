import { useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import { useOrgEditScreenQuery } from '@/generated'

import { AppRootStackScreenProps } from '@/navigation/screenProps'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import OrgEditForm from '@/features/Org/core/Edit/Form'
import useOrgEditForm from '@/features/Org/core/Edit/useForm'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.OrgEdit>

export default function OrgEditScreen() {
    const { params } = useRoute<ScreenProps['route']>()

    const [{ data }] = useOrgEditScreenQuery({
        variables: {
            id: params.id
        }
    })

    const { control, onSubmit } = useOrgEditForm({
        id: params.id,
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
