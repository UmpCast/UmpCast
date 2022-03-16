import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { StackScreenProps } from '@react-navigation/stack'
import { VStack } from 'native-base'
import DivisionCreateForm from './DivisionCreateForm'
import useDivisionCreateForm from './useDivisionCreateForm'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.DivisionCreate
>

export default function DivisionCreateScreen({ route, navigation }: Props) {
    const { seasonId } = route.params

    const { control, onSubmit } = useDivisionCreateForm({
        seasonId,
        onSuccess: () => {
            navigation.goBack()
        }
    })

    return (
        <VStack p={4} space={4}>
            <DivisionCreateForm control={control} onSubmit={onSubmit} />
        </VStack>
    )
}
