import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList, RootStackRoutes } from '@/navigation'
import CreatePositionForm from '@/components/core/CreatePositionForm'
import { VStack, Heading } from 'native-base'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.CreatePosition
>

export default function ({ route, navigation }: Props) {
    const { divisionId } = route.params

    const onCreatePostion = () => {
        navigation.navigate(RootStackRoutes.SeasonStructure)
    }

    return (
        <VStack p={4} space={4}>
            <Heading textAlign="center">Create Position</Heading>
            <CreatePositionForm
                onCreate={onCreatePostion}
                divisionId={divisionId}
            />
        </VStack>
    )
}
