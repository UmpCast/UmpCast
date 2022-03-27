import DivisionCreateForm from '@/features/Division/Create/Form'
import useDivisionCreateForm from '@/features/Division/Create/useForm'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import { AppRootStackScreenProps } from '@/navigation/screenProps'
import { VStack } from 'native-base'

type Props = AppRootStackScreenProps<AppRootStackRoute.DivisionCreate>

export default function DivisionNewScreen({ route, navigation }: Props) {
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
