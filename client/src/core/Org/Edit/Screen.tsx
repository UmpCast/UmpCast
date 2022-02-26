import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useOrgEditScreenQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'
import { useEffect } from 'react'
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

    const { control, onSubmit, reset } = useOrgEditForm({
        id: params.id
    })

    useEffect(() => {
        if (!data?.organization) return

        const { title, description, email, websiteUrl } = data.organization

        reset({
            title,
            description: description ?? '',
            email: email ?? '',
            websiteUrl: websiteUrl ?? ''
        })
    }, [data])

    if (!data?.organization) return null

    return (
        <Box p={4}>
            <VStack space={6}>
                <OrgEditForm
                    control={control}
                    profilePicture={
                        <OrgProfilePicture org={data?.organization} />
                    }
                />
                <Button onPress={onSubmit} colorScheme="indigo">
                    Save Changes
                </Button>
            </VStack>
        </Box>
    )
}
