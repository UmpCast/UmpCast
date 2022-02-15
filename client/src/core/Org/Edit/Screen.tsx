import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useOrgEditScreenQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'
import OrgProfilePicture from '../Profile/Picture'
import OrgEditForm from './Form'
import useOrgEditForm from './useForm'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgEdit>

export default function OrgEditScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgEditScreenQuery({
        variables: {
            id: params.id
        }
    })

    const currentValues = data?.organization ?? {}

    const { control, onSubmit } = useOrgEditForm({
        id: params.id,
        currentValues,
        onSuccess: () => {}
    })

    if (!data?.organization) return null

    return (
        <Box p={4}>
            <VStack>
                <OrgEditForm
                    control={control}
                    profilePicture={
                        <OrgProfilePicture org={data?.organization} />
                    }
                />
            </VStack>
        </Box>
    )
}
