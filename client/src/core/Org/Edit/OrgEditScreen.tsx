import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import { useOrgEditScreenQuery } from '@/generated'

import useOrgEditForm from '@/core/Org/Edit/useOrgEditForm'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import OrgInfoLogo from '../Info/OrgInfoLogo'
import OrgEditForm from './OrgEditForm'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgEdit>

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
                    logo={<OrgInfoLogo org={data?.organization} />}
                />
                <Button colorScheme="indigo" onPress={onSubmit}>
                    Save Changes
                </Button>
            </VStack>
        </Box>
    )
}
