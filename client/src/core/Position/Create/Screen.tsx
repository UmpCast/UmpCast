import { StackScreenProps } from '@react-navigation/stack'
import { VStack, Heading } from 'native-base'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'

import PositionCreateForm from './Form'
import usePositionCreateForm from './useForm'

type Props = StackScreenProps<
    AppRootStackParamList,
    AppRootStackRoute.PositionCreate
>

export default function PositionCreateScreen({ route, navigation }: Props) {
    const { divisionId } = route.params

    const { control, onSubmit } = usePositionCreateForm({
        divisionId,
        onSuccess: () => {
            navigation.goBack()
        }
    })

    return (
        <VStack p={4} space={4}>
            <Heading textAlign="center">Create Position</Heading>
            <PositionCreateForm control={control} onSubmit={onSubmit} />
        </VStack>
    )
}
