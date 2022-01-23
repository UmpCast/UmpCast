import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList, RootStackRoutes } from '@/navigation'

import CreatePositionForm from '../core/CreatePositionForm/CreatePositionForm'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.CreatePosition
>
export default function CreatePositionScreen({ route }: Props) {
    const { divisionId } = route.params

    return <CreatePositionForm divisionId={divisionId} />
}
