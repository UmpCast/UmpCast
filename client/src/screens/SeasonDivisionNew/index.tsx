import DivisionCreateForm from '@/features/Division/Create/Form'
import useDivisionCreateForm from '@/features/Division/Create/useForm'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { VStack } from 'native-base'

type Props = RootStackScreenProps<RootStackRoute.SeasonDivisionNew>

export default function SeasonDivisionNewScreen({ route, navigation }: Props) {
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
