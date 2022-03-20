import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import { useOrgEditScreenQuery } from '@/generated'

import useOrgEditForm from '@/core/Org/Edit/useOrgEditForm'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import OrgEditForm from './OrgEditForm'
import OrgProfileLogo from '../Profile/Logo'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgEdit
>

export default function OrgEditScreen() {
    const { params } = useRoute<ScreenRouteProp>()

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
