import { StackScreenProps } from '@react-navigation/stack'
import { Box } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/navigation'
import SeasonStructurEditor from './Editor'

type ScreenProps = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function SeasonStructureScreen({ route }: ScreenProps) {
    const { params } = route
    return (
        <Box p={4}>
            <SeasonStructurEditor seasonId={params.seasonId} />
        </Box>
    )
}
