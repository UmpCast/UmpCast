import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList, RootStackRoutes } from '@/navigation'

import PositionCreateForm from '../core/PositionCreateForm/PositionCreateForm'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.PositionCreate
>
export default function PositionCreateScreen({ route }: Props) {
    const { divisionId } = route.params

    return <PositionCreateForm divisionId={divisionId} />
}
