import { StackScreenProps } from '@react-navigation/stack'
import { VStack, Heading } from 'native-base'

import CreatePositionForm from '@/components/core/CreatePositionForm'
import { RootStackParamList, RootStackRoutes } from '@/navigation'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.CreatePosition
>

export default function CreatePositionScreen({ route, navigation }: Props) {
    const { divisionId } = route.params

    const onCreatePostion = () => {
        navigation.navigate(RootStackRoutes.SeasonStructure)
    }

    return (
        <VStack p={4} space={4}>
            <Heading textAlign="center">Create Position</Heading>
            <CreatePositionForm
                divisionId={divisionId}
                onCreate={onCreatePostion}
            />
        </VStack>
    )
}
