import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import { StackScreenProps } from '@react-navigation/stack'
import { VStack, Heading } from 'native-base'
import PositionCreateForm from './PositionCreateForm'
import usePositionCreateForm from './usePositionCreateForm'

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
